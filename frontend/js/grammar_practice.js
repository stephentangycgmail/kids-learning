(function () {
  "use strict";

  const core = window.GrammarPracticeCore;
  const storageApi = window.GrammarPracticeStorage;
  const elements = {};
  let store;
  let manifest;
  let banks;
  let activeSession = null;
  let saveQueue = Promise.resolve();

  function getElements() {
    [
      "appMessage", "resumePanel", "continueButton", "abandonButton", "setupPanel",
      "topicSelect", "startButton", "practicePanel", "practiceMeta", "questionPosition",
      "answeredProgress", "saveStatus", "questionNavigator", "questionContainer",
      "previousButton", "nextButton", "submitReviewButton", "submitDialog",
      "submitSummary", "unansweredSummary", "confirmSubmitButton",
    ].forEach((id) => { elements[id] = document.getElementById(id); });
  }

  function showError(message, error) {
    elements.appMessage.textContent = message;
    elements.appMessage.hidden = false;
    if (error) console.error(message, error);
  }

  function selectedMode() {
    const input = document.querySelector('input[name="practiceMode"]:checked');
    return input ? input.value : "short_long";
  }

  async function loadQuestionBanks() {
    const manifestResponse = await fetch("data/grammar_practice_manifest.json");
    if (!manifestResponse.ok) throw new Error(`Manifest request failed: ${manifestResponse.status}`);
    manifest = await manifestResponse.json();
    const [shortResponse, rearrangementResponse] = await Promise.all([
      fetch(`data/${encodeURIComponent(manifest.banks.short_long)}`),
      fetch(`data/${encodeURIComponent(manifest.banks.rearrangement)}`),
    ]);
    if (!shortResponse.ok || !rearrangementResponse.ok) throw new Error("A question bank could not be loaded.");
    const [shortBank, rearrangementBank] = await Promise.all([
      shortResponse.json(), rearrangementResponse.json(),
    ]);
    banks = {
      shortLong: Array.isArray(shortBank.questions) ? shortBank.questions : [],
      rearrangement: Array.isArray(rearrangementBank.questions) ? rearrangementBank.questions : [],
    };
  }

  function updateTopicOptions() {
    const topics = core.availableTopics(manifest, banks, selectedMode());
    elements.topicSelect.textContent = "";
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic.id;
      option.textContent = `${topic.label} · ${topic.labelZh}`;
      elements.topicSelect.appendChild(option);
    });
    elements.topicSelect.disabled = topics.length === 0;
    elements.startButton.disabled = topics.length === 0 || Boolean(activeSession);
  }

  function topicById(topicId) {
    return (manifest.topics || []).find((topic) => topic.id === topicId) || null;
  }

  function isQuestionAnswered(question) {
    const answer = activeSession.answers[question.id];
    if (!answer) return false;
    if (question.type === "rearrangement") return Array.isArray(answer.tokenIds) && answer.tokenIds.length > 0;
    return Object.values(answer.sections || {}).some((section) =>
      Object.values(section || {}).some(Boolean)
    );
  }

  function queueSave() {
    if (!activeSession || activeSession.status !== "in_progress") return Promise.resolve();
    activeSession.lastSavedAt = new Date().toISOString();
    elements.saveStatus.textContent = "Saving...";
    const snapshot = core.clone(activeSession);
    saveQueue = saveQueue
      .then(() => store.save(snapshot))
      .then(() => { elements.saveStatus.textContent = "Saved"; })
      .catch((error) => {
        elements.saveStatus.textContent = "Save failed";
        showError("Your latest answer could not be saved. Please keep this page open and try again.", error);
      });
    return saveQueue;
  }

  function ensureShortAnswer(question) {
    if (!activeSession.answers[question.id]) activeSession.answers[question.id] = { sections: {} };
    if (!activeSession.answers[question.id].sections) activeSession.answers[question.id].sections = {};
    return activeSession.answers[question.id];
  }

  function renderShortLong(question) {
    const type = document.createElement("p");
    type.className = "question-type";
    type.textContent = "Short & Long Answer";
    const prompt = document.createElement("h3");
    prompt.className = "question-prompt";
    prompt.textContent = question.questionText;
    elements.questionContainer.append(type, prompt);

    const answer = ensureShortAnswer(question);
    question.sections.forEach((section) => {
      const sectionElement = document.createElement("section");
      sectionElement.className = "answer-section";
      const heading = document.createElement("h3");
      heading.textContent = section.label;
      const framework = document.createElement("div");
      framework.className = "sentence-framework";
      if (!answer.sections[section.id]) answer.sections[section.id] = {};
      const values = answer.sections[section.id];

      section.segments.forEach((segment) => {
        if (Object.prototype.hasOwnProperty.call(segment, "text")) {
          const text = document.createElement("span");
          text.textContent = segment.text;
          framework.appendChild(text);
          return;
        }
        const definition = section.blanks.find((item) => item.id === segment.blankId);
        const select = document.createElement("select");
        select.className = `blank-select${values[definition.id] ? " has-value" : ""}`;
        select.setAttribute("aria-label", `${section.label}: ${definition.label}`);
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Choose";
        select.appendChild(placeholder);
        definition.options.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });
        select.value = values[definition.id] || "";
        select.addEventListener("change", () => {
          values[definition.id] = select.value;
          select.classList.toggle("has-value", Boolean(select.value));
          updateProgress();
          queueSave();
        });
        framework.appendChild(select);
      });
      sectionElement.append(heading, framework);
      elements.questionContainer.appendChild(sectionElement);
    });
  }

  function ensureRearrangementAnswer(question) {
    if (!activeSession.answers[question.id]) activeSession.answers[question.id] = { tokenIds: [] };
    if (!Array.isArray(activeSession.answers[question.id].tokenIds)) {
      activeSession.answers[question.id].tokenIds = [];
    }
    return activeSession.answers[question.id];
  }

  function renderRearrangement(question) {
    const type = document.createElement("p");
    type.className = "question-type";
    type.textContent = "Sentence Rearrangement";
    const prompt = document.createElement("h3");
    prompt.className = "question-prompt";
    prompt.textContent = "Build the correct sentence.";
    const instructions = document.createElement("p");
    instructions.className = "token-instructions";
    instructions.textContent = "Select tokens to add them. Select a token in your answer to remove it.";
    const source = document.createElement("div");
    source.className = "token-area";
    source.setAttribute("aria-label", "Available tokens");
    const answerArea = document.createElement("div");
    answerArea.className = "token-area answer-area";
    answerArea.setAttribute("aria-label", "Your sentence");
    const clearRow = document.createElement("div");
    clearRow.className = "clear-row";
    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "button button-secondary";
    clearButton.textContent = "Clear Answer";
    clearRow.appendChild(clearButton);
    elements.questionContainer.append(type, prompt, instructions, source, answerArea, clearRow);

    const tokenMap = new Map(question.tokens.map((token) => [token.id, token]));
    const answer = ensureRearrangementAnswer(question);

    function redrawTokens() {
      source.textContent = "";
      question.shuffledTokenIds.forEach((tokenId) => {
        const token = tokenMap.get(tokenId);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "token-button";
        button.textContent = token.text;
        const used = answer.tokenIds.includes(tokenId);
        button.disabled = used;
        button.classList.toggle("used", used);
        button.setAttribute("aria-pressed", used ? "true" : "false");
        button.addEventListener("click", () => {
          if (!answer.tokenIds.includes(tokenId)) answer.tokenIds.push(tokenId);
          redrawTokens();
          updateProgress();
          queueSave();
        });
        source.appendChild(button);
      });

      answerArea.textContent = "";
      if (!answer.tokenIds.length) {
        const empty = document.createElement("span");
        empty.className = "empty-answer";
        empty.textContent = "Your sentence will appear here.";
        answerArea.appendChild(empty);
      } else {
        answer.tokenIds.forEach((tokenId) => {
          const token = tokenMap.get(tokenId);
          if (!token) return;
          const button = document.createElement("button");
          button.type = "button";
          button.className = "token-button answer-token";
          button.textContent = token.text;
          button.setAttribute("aria-label", `Remove ${token.text} from your answer`);
          button.addEventListener("click", () => {
            answer.tokenIds = answer.tokenIds.filter((id) => id !== tokenId);
            activeSession.answers[question.id] = answer;
            redrawTokens();
            updateProgress();
            queueSave();
          });
          answerArea.appendChild(button);
        });
      }
      clearButton.disabled = answer.tokenIds.length === 0;
    }

    clearButton.addEventListener("click", () => {
      answer.tokenIds = [];
      activeSession.answers[question.id] = answer;
      redrawTokens();
      updateProgress();
      queueSave();
    });
    redrawTokens();
  }

  function renderNavigator() {
    elements.questionNavigator.textContent = "";
    activeSession.questionSnapshots.forEach((question, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "navigator-button";
      button.textContent = String(index + 1);
      button.classList.toggle("current", index === activeSession.currentQuestionIndex);
      button.classList.toggle("answered", isQuestionAnswered(question));
      button.setAttribute("aria-label", `Question ${index + 1}${isQuestionAnswered(question) ? ", answered" : ", unanswered"}`);
      if (index === activeSession.currentQuestionIndex) button.setAttribute("aria-current", "step");
      button.addEventListener("click", () => goToQuestion(index));
      elements.questionNavigator.appendChild(button);
    });
  }

  function updateProgress() {
    const answered = core.answeredCount(activeSession);
    elements.answeredProgress.textContent = `Answered ${answered} of 20`;
    renderNavigator();
  }

  function renderQuestion() {
    const index = activeSession.currentQuestionIndex;
    const question = activeSession.questionSnapshots[index];
    elements.questionPosition.textContent = `${index + 1} of 20`;
    elements.questionContainer.textContent = "";
    if (question.type === "short_long") renderShortLong(question);
    else renderRearrangement(question);
    elements.previousButton.disabled = index === 0;
    elements.nextButton.disabled = index === activeSession.questionSnapshots.length - 1;
    updateProgress();
  }

  function goToQuestion(index) {
    if (!activeSession) return;
    activeSession.currentQuestionIndex = Math.max(0, Math.min(index, activeSession.questionSnapshots.length - 1));
    renderQuestion();
    queueSave();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function modeLabel(mode) {
    return {
      short_long: "Short & Long Answer",
      rearrangement: "Sentence Rearrangement",
      mixed: "Mixed Practice",
    }[mode] || mode;
  }

  function showPractice(session) {
    activeSession = session;
    elements.setupPanel.hidden = true;
    elements.resumePanel.hidden = true;
    elements.practicePanel.hidden = false;
    elements.practiceMeta.textContent = `${modeLabel(session.mode)} · ${session.topicLabel}`;
    renderQuestion();
  }

  async function startPractice() {
    elements.startButton.disabled = true;
    try {
      const existing = await store.getActive();
      if (existing) {
        activeSession = existing;
        showResume(existing);
        return;
      }
      const mode = selectedMode();
      const topic = topicById(elements.topicSelect.value);
      const previousSessions = await store.getAll();
      const recentIds = core.recentQuestionIds(previousSessions, 5);
      const questions = core.selectQuestions({ mode, topic, banks, recentIds });
      const session = core.createSession({ mode, topic, questions });
      await store.save(session);
      showPractice(session);
    } catch (error) {
      showError("A new practice could not be started. Please reload the page and try again.", error);
      elements.startButton.disabled = false;
    }
  }

  function showResume(session) {
    activeSession = session;
    elements.resumePanel.hidden = false;
    elements.startButton.disabled = true;
  }

  async function abandonActivePractice() {
    const confirmed = window.confirm("Abandon this practice? It will remain in Practice History and cannot be continued.");
    if (!confirmed) return;
    try {
      await saveQueue;
      const abandoned = core.abandonSession(activeSession);
      await store.save(abandoned);
      activeSession = null;
      elements.resumePanel.hidden = true;
      updateTopicOptions();
    } catch (error) {
      showError("The practice could not be abandoned. Please try again.", error);
    }
  }

  function reviewSubmission() {
    const answered = core.answeredCount(activeSession);
    const unansweredNumbers = activeSession.questionSnapshots
      .map((question, index) => (isQuestionAnswered(question) ? null : index + 1))
      .filter(Boolean);
    elements.submitSummary.textContent = `${answered} answered · ${20 - answered} unanswered`;
    elements.unansweredSummary.textContent = unansweredNumbers.length
      ? `Unanswered questions: ${unansweredNumbers.join(", ")}. You may still submit.`
      : "All questions have an answer.";
    elements.confirmSubmitButton.textContent = unansweredNumbers.length ? "Submit Anyway" : "Submit Answers";
    elements.submitDialog.showModal();
  }

  async function submitPractice() {
    elements.confirmSubmitButton.disabled = true;
    try {
      await saveQueue;
      const submitted = core.submitSession(activeSession);
      await store.save(submitted);
      activeSession = submitted;
      window.location.assign(`grammar_practice_result.html?id=${encodeURIComponent(submitted.sessionId)}`);
    } catch (error) {
      elements.confirmSubmitButton.disabled = false;
      elements.submitDialog.close();
      showError("Your practice could not be submitted. Your saved answers are still available.", error);
    }
  }

  function bindEvents() {
    document.querySelectorAll('input[name="practiceMode"]').forEach((input) => {
      input.addEventListener("change", updateTopicOptions);
    });
    elements.startButton.addEventListener("click", startPractice);
    elements.continueButton.addEventListener("click", () => showPractice(activeSession));
    elements.abandonButton.addEventListener("click", abandonActivePractice);
    elements.previousButton.addEventListener("click", () => goToQuestion(activeSession.currentQuestionIndex - 1));
    elements.nextButton.addEventListener("click", () => goToQuestion(activeSession.currentQuestionIndex + 1));
    elements.submitReviewButton.addEventListener("click", reviewSubmission);
    elements.confirmSubmitButton.addEventListener("click", submitPractice);
  }

  async function initialise() {
    getElements();
    bindEvents();
    try {
      [store] = await Promise.all([
        storageApi.createBrowserStore(),
        loadQuestionBanks(),
      ]);
      const unfinished = await store.getActive();
      if (unfinished) showResume(unfinished);
      updateTopicOptions();
    } catch (error) {
      showError("Grammar Practice is unavailable in this browser. Please reload the page.", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initialise, { once: true });
})();
