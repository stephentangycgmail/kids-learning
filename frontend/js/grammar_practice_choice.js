(function () {
  "use strict";
  const core = window.GrammarPracticeCore; const storageApi = window.GrammarPracticeStorage;
  const el = {}; let store; let topics = []; let bank = []; let session; let saveQueue = Promise.resolve();
  const $ = (id) => document.getElementById(id);
  function error(message, detail) { el.choiceMessage.textContent = message; el.choiceMessage.hidden = false; if (detail) console.error(message, detail); }
  function requestedTopicId() { return new URLSearchParams(window.location.search).get("topic"); }
  function currentTopic() { return topics.find((item) => item.id === el.choiceTopic.value); }
  function questionsForTopic(topic) { const source = bank.find((item) => item.id === topic.id); return source && Array.isArray(source.questionBank) ? source.questionBank : []; }
  function renderSetup() { el.choiceTopic.textContent = ""; topics.forEach((topic) => { const option = document.createElement("option"); option.value = topic.id; option.textContent = `${topic.label} · ${topic.labelZh}`; el.choiceTopic.appendChild(option); }); const requested = requestedTopicId(); if (topics.some((topic) => topic.id === requested)) el.choiceTopic.value = requested; updateSetup(); }
  function updateSetup() { const topic = currentTopic(); if (!topic) return; el.learningLink.href = `grammar.html?lesson=${encodeURIComponent(topic.id)}`; }
  function queueSave() { session.lastSavedAt = new Date().toISOString(); el.choiceSave.textContent = "Saved"; return Promise.resolve(); }
  function begin() { const topic = currentTopic(); const selectedMode = "choice_quiz"; const count = 10; try { const questions = core.selectChoiceQuestions(questionsForTopic(topic), count); session = core.createChoiceSession({ mode: selectedMode, topic, questions }); showSession(); } catch (cause) { error("This topic does not have enough questions.", cause); } }
  function showSession() { el.choiceSetup.hidden = true; el.choicePanel.hidden = false; renderQuestion(); }
  function renderQuestion() {
    const question = session.questionSnapshots[session.currentQuestionIndex]; const quiz = session.mode === "choice_quiz";
    el.choiceMeta.textContent = `${quiz ? "Quiz / Challenge" : "Practice"} · ${session.topicLabel}`; el.choicePosition.textContent = `Question ${session.currentQuestionIndex + 1} of ${session.questionSnapshots.length}`; el.choiceProgress.textContent = `${session.currentQuestionIndex + 1} of ${session.questionSnapshots.length}`; el.choiceQuestion.textContent = "";
    const visual = document.createElement("p"); visual.className = "choice-visual"; visual.setAttribute("aria-hidden", "true"); visual.textContent = question.visual || "";
    const prompt = document.createElement("h3"); prompt.className = "question-prompt"; prompt.textContent = question.prompt.replace(new RegExp(`^${question.answer}\\b`, "i"), "___");
    const zh = document.createElement("p"); zh.className = "zh-text"; zh.textContent = question.prompt_zh || "";
    const choices = document.createElement("div"); choices.className = "choice-options"; core.shuffle(question.options).forEach((option) => { const button = document.createElement("button"); button.type = "button"; button.className = "choice-option"; button.textContent = option; button.addEventListener("click", () => answer(question, option, choices)); choices.appendChild(button); }); el.choiceQuestion.append(visual, prompt); if (zh.textContent) el.choiceQuestion.appendChild(zh); el.choiceQuestion.appendChild(choices);
  }
  function answer(question, selected, choices) {
    const quiz = session.mode === "choice_quiz"; const correct = selected === question.answer; session.answers[question.id] = { selected }; choices.querySelectorAll("button").forEach((button) => { button.disabled = true; if (!quiz && button.textContent === question.answer) button.classList.add("correct"); if (!quiz && !correct && button.textContent === selected) button.classList.add("wrong"); });
    const feedback = document.createElement("div"); feedback.className = `choice-feedback ${quiz ? "saved" : correct ? "correct" : "incorrect"}`;
    if (quiz) feedback.textContent = "Answer saved. 答案已儲存。"; else feedback.innerHTML = `<strong>${correct ? "Correct! 做得好！" : `Incorrect. 正確答案是「${question.answer}」。`}</strong><br>${question.why}${question.why_zh ? `<br><span class="zh-text">${question.why_zh}</span>` : ""}`;
    const next = document.createElement("button"); next.type = "button"; next.className = "button button-primary"; next.textContent = session.currentQuestionIndex === session.questionSnapshots.length - 1 ? "Finish" : "Next →"; next.addEventListener("click", nextQuestion); feedback.appendChild(next); el.choiceQuestion.appendChild(feedback); queueSave();
  }
  async function nextQuestion() { await saveQueue; if (session.currentQuestionIndex < session.questionSnapshots.length - 1) { session.currentQuestionIndex += 1; await queueSave(); renderQuestion(); return; } const submitted = core.submitChoiceSession(session); await store.save(submitted); window.location.assign(`grammar_practice_result.html?id=${encodeURIComponent(submitted.sessionId)}`); }
  async function initialise() { ["choiceMessage", "choiceSetup", "choiceTopic", "choiceStart", "learningLink", "choicePanel", "choiceMeta", "choicePosition", "choiceProgress", "choiceSave", "choiceQuestion"].forEach((id) => { el[id] = $(id); }); try { const [manifestResponse, bankResponse] = await Promise.all([fetch("data/grammar_practice_manifest.json"), fetch("data/grammar_practice_choice.json")]); if (!manifestResponse.ok || !bankResponse.ok) throw new Error("Question bank request failed."); const [manifest, data] = await Promise.all([manifestResponse.json(), bankResponse.json()]); topics = manifest.topics.filter((item) => item.practiceType === "choice"); bank = data.topics || []; store = await storageApi.createBrowserStore(); renderSetup(); el.choiceTopic.addEventListener("change", updateSetup); el.choiceStart.addEventListener("click", begin); } catch (cause) { error("Grammar Practice is unavailable. Please reload and try again.", cause); } }
  document.addEventListener("DOMContentLoaded", initialise, { once: true });
})();
