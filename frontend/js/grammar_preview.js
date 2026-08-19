(function () {
  "use strict";

  const DATA_PATH = "data/grammar_preview_topics.json";
  const STORAGE_KEY = "kidsLearning.grammarPreview.progress.v1";
  let topics = [];
  let activeTopic = null;
  let stageIndex = 0;
  let questionIndex = 0;
  let score = 0;

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));

  function saveCompletion() {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      current[activeTopic.id] = { completedAt: new Date().toISOString(), score, total: totalQuestions(activeTopic) };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (error) {
      console.warn("Preview progress could not be saved.", error);
    }
  }

  function totalQuestions(topic) {
    return topic.stages.reduce((total, stage) => total + stage.questions.length, 0);
  }

  function completedBefore(topic) {
    try { return Boolean(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")[topic.id]); } catch (_) { return false; }
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
    stageIndex = 0;
    questionIndex = 0;
    score = 0;
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
      <section class="learning-card"><h2>Ready to practise?</h2><p>Work through four short stages. Every answer gives a reason, so you can learn from a mistake.</p><button id="startPractice" class="next-button" type="button">Start practice →</button></section>`;
    byId("startPractice").addEventListener("click", renderQuestion);
  }

  function renderQuestion() {
    const stage = activeTopic.stages[stageIndex];
    const question = stage.questions[questionIndex];
    const completed = activeTopic.stages.slice(0, stageIndex).reduce((count, item) => count + item.questions.length, 0) + questionIndex;
    byId("lesson").innerHTML = `<section class="practice-card"><div class="practice-header"><div><p class="step-label">Practice</p><h2>${escapeHtml(stage.title)}</h2></div><p class="progress">Question ${completed + 1} of ${totalQuestions(activeTopic)}</p></div><div class="question-visual" aria-hidden="true">${question.visual}</div><p class="prompt">${escapeHtml(question.prompt)}</p><div id="choices" class="choice-list"></div><div id="feedback" aria-live="polite"></div></section>`;
    const choices = byId("choices");
    question.options.forEach((option) => {
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
    byId("choices").querySelectorAll("button").forEach((choice) => { choice.disabled = true; if (choice.textContent === question.answer) choice.classList.add("correct"); });
    if (isCorrect) score += 1;
    if (!isCorrect) button.classList.add("wrong");
    const feedback = byId("feedback");
    feedback.className = `feedback ${isCorrect ? "good" : "try"}`;
    feedback.textContent = `${isCorrect ? "Great job!" : `Not this time. The best answer is “${question.answer}”.`} ${question.why}`;
    const next = document.createElement("button");
    next.className = "next-button";
    next.type = "button";
    next.textContent = "Next →";
    next.addEventListener("click", nextQuestion);
    feedback.appendChild(next);
  }

  function nextQuestion() {
    questionIndex += 1;
    if (questionIndex < activeTopic.stages[stageIndex].questions.length) return renderQuestion();
    stageIndex += 1;
    questionIndex = 0;
    if (stageIndex < activeTopic.stages.length) return renderQuestion();
    saveCompletion();
    renderTabs();
    byId("lesson").innerHTML = `<section class="completion-card"><div class="picture" aria-hidden="true">🎉</div><h2>Practice complete!</h2><p>You scored ${score} out of ${totalQuestions(activeTopic)}.</p><p>Your preview completion is saved only in this browser. It does not appear in released Grammar Practice History.</p><button id="learnAgain" class="next-button" type="button">Learn again</button></section>`;
    byId("learnAgain").addEventListener("click", () => startTopic(activeTopic));
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
