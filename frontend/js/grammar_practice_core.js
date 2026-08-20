(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GrammarPracticeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SESSION_SCHEMA_VERSION = 1;
  const SESSION_SIZE = 20;
  const LOCKED_STATUSES = new Set(["submitted", "abandoned"]);
  const VALID_MODES = new Set(["short_long", "rearrangement", "mixed"]);
  const CHOICE_MODES = new Set(["choice_practice", "choice_quiz"]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function randomId(now) {
    const time = (now || new Date()).getTime().toString(36);
    const random = Math.random().toString(36).slice(2, 10);
    return `gp-${time}-${random}`;
  }

  function shuffle(items, rng) {
    const result = items.slice();
    const random = rng || Math.random;
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function shuffledTokenIds(tokens, rng) {
    const original = tokens.map((token) => token.id);
    if (original.length < 2) return original;
    let shuffled = shuffle(original, rng);
    if (shuffled.every((id, index) => id === original[index])) {
      shuffled = original.slice(1).concat(original[0]);
    }
    return shuffled;
  }

  function matchesTopic(question, topic) {
    if (!topic) return true;
    const categories = Array.isArray(topic.categories) ? topic.categories : [];
    if (categories.length && !categories.includes(question.category)) return false;
    if (topic.requiredTag) {
      return Array.isArray(question.tags) && question.tags.includes(topic.requiredTag);
    }
    return true;
  }

  function countForMode(banks, mode, topic) {
    const shortCount = banks.shortLong.filter((item) => matchesTopic(item, topic)).length;
    const rearrangementCount = banks.rearrangement.filter((item) => matchesTopic(item, topic)).length;
    if (mode === "short_long") return shortCount >= SESSION_SIZE;
    if (mode === "rearrangement") return rearrangementCount >= SESSION_SIZE;
    return shortCount >= SESSION_SIZE / 2 && rearrangementCount >= SESSION_SIZE / 2;
  }

  function availableTopics(manifest, banks, mode) {
    if (!VALID_MODES.has(mode)) return [];
    return (manifest.topics || []).filter((topic) => countForMode(banks, mode, topic));
  }

  function takeBalanced(candidates, count, recentIds, rng) {
    const recent = new Set(recentIds || []);
    const unused = candidates.filter((item) => !recent.has(item.id));
    const pool = unused.length >= count
      ? unused
      : unused.concat(candidates.filter((item) => recent.has(item.id)));
    const targets = count === 20
      ? { easy: 8, standard: 8, challenging: 4 }
      : count === 10
        ? { easy: 4, standard: 4, challenging: 2 }
        : { easy: Math.ceil(count * 0.4), standard: Math.ceil(count * 0.4), challenging: Math.floor(count * 0.2) };
    const selected = [];
    const selectedIds = new Set();
    const signatures = new Set();

    function chooseByCategory(items, amount, allowNearDuplicates) {
      const groups = new Map();
      shuffle(items, rng).forEach((item) => {
        if (!groups.has(item.category)) groups.set(item.category, []);
        groups.get(item.category).push(item);
      });
      const categories = shuffle(Array.from(groups.keys()), rng);
      let added = 0;
      let progress = true;
      while (added < amount && progress) {
        progress = false;
        for (const category of categories) {
          const group = groups.get(category);
          while (group && group.length) {
            const candidate = group.shift();
            if (selectedIds.has(candidate.id)) continue;
            if (!allowNearDuplicates && candidate.nearDuplicateKey && signatures.has(candidate.nearDuplicateKey)) continue;
            selected.push(candidate);
            selectedIds.add(candidate.id);
            if (candidate.nearDuplicateKey) signatures.add(candidate.nearDuplicateKey);
            added += 1;
            progress = true;
            break;
          }
          if (added >= amount) break;
        }
      }
      return added;
    }

    Object.entries(targets).forEach(([level, amount]) => {
      const levelItems = pool.filter((item) => item.difficulty === level);
      const added = chooseByCategory(levelItems, amount, false);
      if (added < amount) chooseByCategory(levelItems, amount - added, true);
    });

    if (selected.length < count) {
      const remaining = pool.filter((item) => !selectedIds.has(item.id));
      const added = chooseByCategory(remaining, count - selected.length, false);
      if (added < count - selected.length) {
        chooseByCategory(remaining, count - selected.length, true);
      }
    }
    if (selected.length !== count) {
      throw new Error(`Not enough valid questions to create a ${count}-question session.`);
    }
    return selected;
  }

  function selectQuestions(options) {
    const mode = options.mode;
    if (!VALID_MODES.has(mode)) throw new Error("Unknown practice mode.");
    const topic = options.topic;
    const recentIds = options.recentIds || [];
    const rng = options.rng || Math.random;
    const shortCandidates = options.banks.shortLong.filter((item) => matchesTopic(item, topic));
    const rearrangementCandidates = options.banks.rearrangement.filter((item) => matchesTopic(item, topic));
    let selected;
    if (mode === "short_long") {
      selected = takeBalanced(shortCandidates, 20, recentIds, rng);
    } else if (mode === "rearrangement") {
      selected = takeBalanced(rearrangementCandidates, 20, recentIds, rng);
    } else {
      const short = takeBalanced(shortCandidates, 10, recentIds, rng);
      const rearrangement = takeBalanced(rearrangementCandidates, 10, recentIds, rng);
      selected = shuffle(short.concat(rearrangement), rng);
    }
    if (new Set(selected.map((item) => item.id)).size !== SESSION_SIZE) {
      throw new Error("Question selection contains duplicate IDs.");
    }
    return selected;
  }

  function createSession(options) {
    const now = options.now || new Date();
    const rng = options.rng || Math.random;
    const snapshots = options.questions.map((question) => {
      const snapshot = clone(question);
      if (snapshot.type === "rearrangement") {
        snapshot.shuffledTokenIds = shuffledTokenIds(snapshot.tokens, rng);
      }
      return snapshot;
    });
    return {
      sessionId: options.sessionId || randomId(now),
      schemaVersion: SESSION_SCHEMA_VERSION,
      mode: options.mode,
      topic: options.topic.id,
      topicLabel: options.topic.label,
      questionIds: snapshots.map((item) => item.id),
      questionSnapshots: snapshots,
      answers: {},
      currentQuestionIndex: 0,
      startedAt: now.toISOString(),
      lastSavedAt: now.toISOString(),
      submittedAt: null,
      abandonedAt: null,
      status: "in_progress",
      scoreSummary: null,
      review: null,
    };
  }

  function selectChoiceQuestions(questions, count, rng) {
    const selected = shuffle(questions, rng).slice(0, count);
    if (selected.length !== count || new Set(selected.map((item) => item.id)).size !== count) throw new Error(`Not enough unique questions to create a ${count}-question session.`);
    return selected;
  }

  function createChoiceSession(options) {
    const now = options.now || new Date(); const questions = options.questions.map(clone);
    return { sessionId: options.sessionId || randomId(now), schemaVersion: SESSION_SCHEMA_VERSION, mode: options.mode,
      topic: options.topic.id, topicLabel: options.topic.label, questionIds: questions.map((item) => item.id),
      questionSnapshots: questions, answers: {}, currentQuestionIndex: 0, startedAt: now.toISOString(), lastSavedAt: now.toISOString(),
      submittedAt: null, abandonedAt: null, status: "in_progress", scoreSummary: null, review: null };
  }

  const CHOICE_TERM_MEANINGS = {
    What: { en: "asks about a thing or an action", zh: "問甚麼：用來詢問事物或動作" },
    Who: { en: "asks about a person", zh: "問誰：用來詢問人物" },
    Where: { en: "asks about a place", zh: "問哪裡：用來詢問地方" },
    When: { en: "asks about a time or day", zh: "問何時：用來詢問時間或日子" },
    Why: { en: "asks for a reason", zh: "問為甚麼：用來詢問原因" },
    Which: { en: "asks someone to choose from options", zh: "問哪一個：用來在選項中作選擇" },
    Whose: { en: "asks who owns something", zh: "問誰的：用來詢問物主" },
    How: { en: "asks about a way, condition, or amount", zh: "問怎樣：用來詢問方法、情況或程度" },
    some: { en: "an unspecified amount or number", zh: "表示一些，數量不確定" },
    any: { en: "an unspecified amount or number, often in questions and negatives", zh: "表示任何一些，常用於疑問句和否定句" },
    "a few": { en: "a small number of countable things", zh: "表示少量可數的東西" },
    "a little": { en: "a small amount of an uncountable thing", zh: "表示少量不可數的東西" },
    many: { en: "a large number of countable things", zh: "表示很多可數的東西" },
    much: { en: "a large amount of an uncountable thing", zh: "表示很多不可數的東西" },
  };

  function choiceTermMeaning(answer) {
    return CHOICE_TERM_MEANINGS[answer] || null;
  }

  function completedChoiceSentence(question) {
    return question.prompt.includes("___") ? question.prompt.replace("___", question.answer) : question.prompt;
  }

  function choiceContextExplanation(question, selected) {
    if (!selected || selected === question.answer) return null;
    const selectedMeaning = choiceTermMeaning(selected); const correctMeaning = choiceTermMeaning(question.answer);
    if (!selectedMeaning || !correctMeaning || !question.prompt.includes("___")) return null;
    const noun = (question.prompt.match(/___\s+([A-Za-z]+)/) || [])[1];
    if (!noun) return null;
    const nounLabel = noun.charAt(0).toUpperCase() + noun.slice(1);
    const extra = question.answer === "a little"
      ? " Much is also used with uncountable nouns, but it means a large amount; this sentence needs a small amount."
      : "";
    return {
      en: `${nounLabel} is the noun in this sentence. ${selected} is used for ${selectedMeaning.en}, so it does not fit here. ${question.answer} is used for ${correctMeaning.en}, which matches this sentence.${extra}`,
      zh: `${nounLabel} 是本句的名詞。${selected} 用於${selectedMeaning.zh.replace("表示", "")}，所以不適合本句。${question.answer} 用於${correctMeaning.zh.replace("表示", "")}，符合本句。${question.answer === "a little" ? "much 也可用於不可數名詞，但表示大量；本句需要表示少量。" : ""}`
    };
  }

  function scoreChoiceSession(session) {
    const review = session.questionSnapshots.map((question, index) => {
      const selected = session.answers[question.id] && session.answers[question.id].selected;
      return { questionNumber: index + 1, questionId: question.id, type: "choice", originalQuestion: question.prompt,
        selectedAnswer: selected || "No answer", submittedAnswer: selected || "No answer", correctAnswer: question.answer,
        correct: selected === question.answer, answered: Boolean(selected), explanation: question.why, explanationZh: question.why_zh || "",
        completedSentence: completedChoiceSentence(question), completedSentenceZh: question.prompt_zh || "",
        correctAnswerMeaning: choiceTermMeaning(question.answer), selectedAnswerMeaning: choiceTermMeaning(selected),
        contextExplanation: choiceContextExplanation(question, selected) };
    });
    const correct = review.filter((item) => item.correct).length; const unanswered = review.filter((item) => !item.answered).length;
    return { summary: { totalQuestions: review.length, fullyCorrect: correct, correctQuestions: correct,
      incorrectQuestions: review.length - correct - unanswered, unansweredQuestions: unanswered, correctSections: 0, totalSections: 0,
      percentage: Math.round(correct / review.length * 100) }, review };
  }

  function submitChoiceSession(session, now) {
    if (session.status !== "in_progress") throw new Error("This practice is already locked.");
    const submitted = clone(session); const finished = now || new Date(); const result = scoreChoiceSession(submitted);
    submitted.status = "submitted"; submitted.submittedAt = finished.toISOString(); submitted.lastSavedAt = submitted.submittedAt;
    submitted.scoreSummary = result.summary; submitted.review = result.review; return submitted;
  }

  function sectionAnswer(question, section, answer) {
    const values = answer && answer.sections && answer.sections[section.id]
      ? answer.sections[section.id]
      : {};
    return section.segments.map((segment) => {
      if (Object.prototype.hasOwnProperty.call(segment, "text")) return segment.text;
      return values[segment.blankId] || "[blank]";
    }).join("");
  }

  function scoreShortLong(question, answer) {
    const sectionResults = question.sections.map((section) => {
      const values = answer && answer.sections && answer.sections[section.id]
        ? answer.sections[section.id]
        : {};
      const correct = section.blanks.every((item) => values[item.id] === item.correct);
      const answered = section.blanks.some((item) => Boolean(values[item.id]));
      return {
        id: section.id,
        label: section.label,
        correct,
        answered,
        submittedAnswer: sectionAnswer(question, section, answer),
        correctAnswer: section.correctAnswer,
      };
    });
    return {
      answered: sectionResults.some((item) => item.answered),
      correct: sectionResults.every((item) => item.correct),
      correctSections: sectionResults.filter((item) => item.correct).length,
      totalSections: 4,
      sectionResults,
      submittedAnswer: sectionResults.map((item) => `${item.label}: ${item.submittedAnswer}`).join("\n"),
      correctAnswer: sectionResults.map((item) => `${item.label}: ${item.correctAnswer}`).join("\n"),
    };
  }

  function sentenceFromTokenIds(question, tokenIds) {
    const tokenMap = new Map(question.tokens.map((token) => [token.id, token.text]));
    let sentence = "";
    (tokenIds || []).forEach((id) => {
      const text = tokenMap.get(id);
      if (!text) return;
      if (["?", ".", ",", "!"].includes(text)) sentence += text;
      else sentence += sentence ? ` ${text}` : text;
    });
    return sentence;
  }

  function scoreRearrangement(question, answer) {
    const tokenIds = answer && Array.isArray(answer.tokenIds) ? answer.tokenIds : [];
    const correctIds = question.tokens.map((token) => token.id);
    const correct = tokenIds.length === correctIds.length
      && tokenIds.every((id, index) => id === correctIds[index]);
    return {
      answered: tokenIds.length > 0,
      correct,
      correctSections: 0,
      totalSections: 0,
      sectionResults: [],
      submittedAnswer: sentenceFromTokenIds(question, tokenIds) || "No answer",
      correctAnswer: question.correctSentence,
    };
  }

  function scoreSession(session) {
    const review = session.questionSnapshots.map((question, index) => {
      const answer = session.answers[question.id];
      const result = question.type === "short_long"
        ? scoreShortLong(question, answer)
        : scoreRearrangement(question, answer);
      return {
        questionNumber: index + 1,
        questionId: question.id,
        type: question.type,
        originalQuestion: question.type === "short_long" ? question.questionText : "Build the sentence.",
        correctSentence: question.correctSentence || null,
        explanation: question.explanation,
        ...result,
      };
    });
    const fullyCorrect = review.filter((item) => item.correct).length;
    const unanswered = review.filter((item) => !item.answered).length;
    const correctSections = review.reduce((sum, item) => sum + item.correctSections, 0);
    const totalSections = review.reduce((sum, item) => sum + item.totalSections, 0);
    return {
      summary: {
        totalQuestions: review.length,
        fullyCorrect,
        correctQuestions: fullyCorrect,
        incorrectQuestions: review.length - fullyCorrect - unanswered,
        unansweredQuestions: unanswered,
        correctSections,
        totalSections,
      },
      review,
    };
  }

  function submitSession(session, now) {
    if (session.status !== "in_progress") throw new Error("This practice is already locked.");
    const finished = now || new Date();
    const result = scoreSession(session);
    const submitted = clone(session);
    submitted.status = "submitted";
    submitted.submittedAt = finished.toISOString();
    submitted.lastSavedAt = finished.toISOString();
    submitted.scoreSummary = result.summary;
    submitted.review = result.review;
    return submitted;
  }

  function abandonSession(session, now) {
    if (session.status !== "in_progress") throw new Error("Only an active practice can be abandoned.");
    const abandoned = clone(session);
    const time = now || new Date();
    abandoned.status = "abandoned";
    abandoned.abandonedAt = time.toISOString();
    abandoned.lastSavedAt = time.toISOString();
    return abandoned;
  }

  function answeredCount(session) {
    return session.questionSnapshots.reduce((count, question) => {
      const answer = session.answers[question.id];
      if (question.type === "rearrangement") {
        return count + (answer && Array.isArray(answer.tokenIds) && answer.tokenIds.length ? 1 : 0);
      }
      const sections = answer && answer.sections ? answer.sections : {};
      const hasValue = Object.values(sections).some((values) =>
        Object.values(values || {}).some(Boolean)
      );
      return count + (hasValue ? 1 : 0);
    }, 0);
  }

  function recentQuestionIds(sessions, limit) {
    const recent = sessions
      .filter((item) => LOCKED_STATUSES.has(item.status))
      .sort((a, b) => new Date(b.submittedAt || b.abandonedAt || b.startedAt) - new Date(a.submittedAt || a.abandonedAt || a.startedAt))
      .slice(0, limit || 5);
    return Array.from(new Set(recent.flatMap((item) => item.questionIds || [])));
  }

  function durationSeconds(session) {
    const end = session.submittedAt || session.abandonedAt || session.lastSavedAt;
    const duration = new Date(end).getTime() - new Date(session.startedAt).getTime();
    return Math.max(0, Math.round(duration / 1000));
  }

  function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Number(totalSeconds) || 0);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    return hours ? `${hours}h ${minutes}m ${remainder}s` : `${minutes}m ${remainder}s`;
  }

  return {
    SESSION_SCHEMA_VERSION,
    SESSION_SIZE,
    VALID_MODES,
    CHOICE_MODES,
    abandonSession,
    answeredCount,
    availableTopics,
    clone,
    choiceTermMeaning,
    choiceContextExplanation,
    completedChoiceSentence,
    createSession,
    createChoiceSession,
    durationSeconds,
    formatDuration,
    matchesTopic,
    recentQuestionIds,
    scoreSession,
    scoreChoiceSession,
    selectChoiceQuestions,
    selectQuestions,
    sentenceFromTokenIds,
    shuffle,
    shuffledTokenIds,
    submitSession,
    submitChoiceSession,
  };
});
