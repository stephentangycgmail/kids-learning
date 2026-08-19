(function () {
  "use strict";

  const DATA_PATH = "data/grammar_preview_topics.json";
  const STORAGE_KEY = "kidsLearning.grammarPreview.progress.v2";
  let topics = [];
  let activeTopic = null;
  let questionIndex = 0;
  let score = 0;
  let mode = "practice";
  let sessionQuestions = [];
  let answers = [];

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));

  function saveCompletion() {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const total = sessionQuestions.length;
      const record = { mode, completedAt: new Date().toISOString(), score, total, percentage: Math.round(score / total * 100) };
      current[activeTopic.id] = Array.isArray(current[activeTopic.id]) ? current[activeTopic.id] : [];
      current[activeTopic.id].push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (error) {
      console.warn("Preview progress could not be saved.", error);
    }
  }

  function questionBank(topic) {
    const bank = topic.questionBank;
    return Array.isArray(bank) ? bank : topic.stages.flatMap((stage, stageIndex) => stage.questions.map((question, index) => ({ ...question, id: `${topic.id}-${stageIndex + 1}-${index + 1}` })));
  }

  function totalQuestions(topic) {
    return questionBank(topic).length;
  }

  function completedBefore(topic) {
    try { return Boolean(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")[topic.id]?.length); } catch (_) { return false; }
  }

  function renderTabs() {
    const tabs = byId("topicTabs");
    tabs.textContent = "";
    topics.forEach((topic) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${topic.title}${completedBefore(topic) ? " ✓" : ""}`;
      button.setAttribute("aria-selected", String(topic.id === activeTopic.id));
      button.addEventListener("click", () => startTopic(topic));
      tabs.appendChild(button);
    });
  }

  function startTopic(topic) {
    activeTopic = topic;
    questionIndex = 0;
    score = 0;
    mode = "practice";
    sessionQuestions = [];
    answers = [];
    renderTabs();
    renderLearning();
  }

  function renderLearning() {
    const learning = activeTopic.learning;
    const visual = (card) => card.visual === "water-glass"
      ? `<span class="water-glass" style="--water-level:${Math.max(0, Math.min(100, Number(card.water_level) || 0))}%" role="img" aria-label="A large glass with ${card.water_level}% water"></span>`
      : `<span class="picture" aria-hidden="true">${card.picture}</span>`;
    const waterCards = learning.cards.filter((card) => card.visual === "water-glass");
    const special = activeTopic.id === "quantifiers"
      ? `<div class="comparison"><div class="countable"><h3>Countable</h3><p>Count one by one: ${learning.countable.map(escapeHtml).join(", ")}.</p></div><div class="uncountable"><h3>Uncountable</h3><p>Measure as an amount: ${learning.uncountable.map(escapeHtml).join(", ")}.</p></div></div><section class="water-comparison" aria-label="Compare small and large amounts of water"><h2>Compare the same large glass</h2><p class="zh-copy">比較同一款大玻璃杯中的水量。</p><div>${waterCards.map((card) => `<article>${visual(card)}<h3>${escapeHtml(card.word)} water</h3><p>${escapeHtml(card.meaning)}</p><p class="zh-copy">${escapeHtml(card.meaning_zh)}</p></article>`).join("")}</div></section>`
      : "";
    byId("lesson").innerHTML = `
      <section class="hero"><p class="step-label">Learn first</p><h2>${escapeHtml(activeTopic.title)}</h2><p>${escapeHtml(activeTopic.subtitle)}</p><p class="zh-copy">${escapeHtml(activeTopic.subtitle_zh || "")}</p><p>${escapeHtml(learning.intro)}</p><p class="zh-copy">${escapeHtml(learning.intro_zh || "")}</p></section>
      ${special}
      <section class="learning-card"><h2>Look, say and read</h2><div class="visual-grid">${learning.cards.map((card) => `<article class="visual-card">${visual(card)}<h3>${escapeHtml(card.word)}</h3><p>${escapeHtml(card.meaning)}</p><p class="zh-copy">${escapeHtml(card.meaning_zh || "")}</p><p><strong>${escapeHtml(card.example)}</strong></p><p class="zh-copy"><strong>${escapeHtml(card.example_zh || "")}</strong></p></article>`).join("")}</div></section>
      <section class="learning-card"><h2>Choose a mode</h2><p>Practice gives feedback after each answer. Quiz waits until the end.</p><p class="zh-copy">練習模式會即時提示；測驗模式完成後才顯示答案。</p><div class="mode-actions"><button id="startPractice" class="next-button" type="button">Practice (12)</button><button id="startQuiz" class="next-button secondary-button" type="button">Quiz / Challenge (10)</button></div></section>`;
    byId("startPractice").addEventListener("click", () => beginSession("practice"));
    byId("startQuiz").addEventListener("click", () => beginSession("quiz"));
  }

  function shuffle(items) { const copy = items.slice(); for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }

  function beginSession(selectedMode) {
    mode = selectedMode;
    sessionQuestions = shuffle(questionBank(activeTopic)).slice(0, mode === "quiz" ? 10 : 12);
    questionIndex = 0;
    score = 0;
    answers = [];
    renderQuestion();
  }

  function renderQuestion() {
    const question = sessionQuestions[questionIndex];
    const heading = mode === "quiz" ? "Quiz / Challenge" : "Practice";
    const options = shuffle(question.options);
    byId("lesson").innerHTML = `<section class="practice-card"><div class="practice-header"><div><p class="step-label">${heading}</p><h2>${escapeHtml(question.stage || "Question")}</h2></div><p class="progress">Question ${questionIndex + 1} of ${sessionQuestions.length}</p></div><div class="question-visual" aria-hidden="true">${question.visual}</div><p class="prompt">${escapeHtml(question.prompt)}</p><div id="choices" class="choice-list"></div><div id="feedback" aria-live="polite"></div></section>`;
    const choices = byId("choices");
    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";
      button.textContent = option;
      button.addEventListener("click", () => answerQuestion(option, question, button));
      choices.appendChild(button);
    });
  }

  function answerQuestion(option, question, button) {
    const isCorrect = option === question.answer;
    byId("choices").querySelectorAll("button").forEach((choice) => { choice.disabled = true; if (mode === "practice" && choice.textContent === question.answer) choice.classList.add("correct"); });
    if (isCorrect) score += 1;
    answers.push({ id: question.id, selected: option, correct: question.answer, isCorrect, question });
    if (mode === "quiz") return nextQuestion();
    if (!isCorrect) button.classList.add("wrong");
    const feedback = byId("feedback");
    feedback.className = `feedback ${isCorrect ? "good" : "try"}`;
    feedback.innerHTML = `<strong>${isCorrect ? "Correct! 做得好！" : `Incorrect. 正確答案是「${escapeHtml(question.answer)}」。`}</strong> ${escapeHtml(question.why)}${question.why_zh ? `<br><span class="zh-copy">${escapeHtml(question.why_zh)}</span>` : ""}`;
    const next = document.createElement("button");
    next.className = "next-button";
    next.type = "button";
    next.textContent = "Next →";
    next.addEventListener("click", nextQuestion);
    feedback.appendChild(next);
  }

  function nextQuestion() {
    questionIndex += 1;
    if (questionIndex < sessionQuestions.length) return renderQuestion();
    saveCompletion();
    renderCompletion();
  }

  function renderCompletion() {
    renderTabs();
    const total = sessionQuestions.length;
    const percentage = Math.round(score / total * 100);
    const mistakes = answers.filter((item) => !item.isCorrect);
    const review = mode === "quiz" && mistakes.length ? `<div class="mistake-list"><h3>Review mistakes</h3>${mistakes.map((item) => `<article><p><strong>${escapeHtml(item.question.prompt)}</strong></p><p>Your answer: ${escapeHtml(item.selected)}</p><p>Correct answer: ${escapeHtml(item.correct)}</p><p>${escapeHtml(item.question.why)}${item.question.why_zh ? `<br><span class="zh-copy">${escapeHtml(item.question.why_zh)}</span>` : ""}</p></article>`).join("")}</div>` : "";
    byId("lesson").innerHTML = `<section class="completion-card"><div class="picture" aria-hidden="true">🎉</div><h2>${mode === "quiz" ? "Quiz complete!" : "Practice complete!"}</h2><p class="score-summary">Score: ${score} / ${total} (${percentage}%)</p><p class="zh-copy">這次得分：${score}/${total}（${percentage}%）</p>${review}<p>Saved only in this browser. It does not appear in released Grammar Practice History.</p><div class="mode-actions"><button id="tryAgain" class="next-button" type="button">Try Quiz Again</button><button id="practiceAgain" class="next-button secondary-button" type="button">Practice Again</button><button id="backLearning" class="next-button secondary-button" type="button">Back to Learning</button></div></section>`;
    byId("tryAgain").hidden = mode !== "quiz";
    byId("tryAgain").addEventListener("click", () => beginSession("quiz"));
    byId("practiceAgain").addEventListener("click", () => beginSession("practice"));
    byId("backLearning").addEventListener("click", () => startTopic(activeTopic));
  }

  fetch(DATA_PATH)
    .then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
    .then((data) => {
      topics = Array.isArray(data.topics) ? data.topics : [];
      if (!data.preview || topics.length !== 2) throw new Error("Preview topics are unavailable.");
      startTopic(topics[0]);
    })
    .catch((error) => {
      console.error("Preview grammar could not load.", error);
      const message = byId("appMessage");
      message.hidden = false;
      message.textContent = "Preview grammar could not load. Please refresh and try again.";
    });
})();
