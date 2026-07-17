(function () {
  "use strict";

  const core = window.GrammarPracticeCore;
  const storageApi = window.GrammarPracticeStorage;
  let session;
  let currentView = "wrong";

  function byId(id) { return document.getElementById(id); }
  function addDefinition(list, label, value) {
    const wrapper = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    wrapper.append(term, detail);
    list.appendChild(wrapper);
  }
  function dateTime(value) {
    return value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "medium" }).format(new Date(value)) : "—";
  }
  function modeLabel(mode) {
    return { short_long: "Short & Long Answer", rearrangement: "Sentence Rearrangement", mixed: "Mixed Practice" }[mode] || mode;
  }
  function showError(message, error) {
    const panel = byId("resultMessage");
    panel.textContent = message;
    panel.hidden = false;
    if (error) console.error(message, error);
  }

  function renderSummary() {
    const summary = session.scoreSummary;
    byId("overallScore").textContent = `${summary.fullyCorrect} / ${summary.totalQuestions}`;
    const scoreDetails = byId("scoreDetails");
    scoreDetails.textContent = "";
    addDefinition(scoreDetails, "Correct questions", String(summary.correctQuestions));
    addDefinition(scoreDetails, "Incorrect questions", String(summary.incorrectQuestions));
    addDefinition(scoreDetails, "Unanswered questions", String(summary.unansweredQuestions));
    if (summary.totalSections) {
      addDefinition(scoreDetails, "Correct answer sections", `${summary.correctSections} / ${summary.totalSections}`);
    }

    const details = byId("sessionDetails");
    details.textContent = "";
    addDefinition(details, "Practice mode", modeLabel(session.mode));
    addDefinition(details, "Topic", session.topicLabel);
    addDefinition(details, "Started", dateTime(session.startedAt));
    addDefinition(details, "Completed", dateTime(session.submittedAt));
    addDefinition(details, "Time used", core.formatDuration(core.durationSeconds(session)));
    addDefinition(details, "Status", "Submitted");
  }

  function renderReview() {
    const list = byId("reviewList");
    list.textContent = "";
    const records = currentView === "wrong" ? session.review.filter((item) => !item.correct) : session.review;
    byId("reviewTitle").textContent = currentView === "wrong" ? "Wrong Answers" : "All Questions";
    if (!records.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Excellent work — there are no wrong answers to review.";
      list.appendChild(empty);
      return;
    }
    records.forEach((item) => {
      const card = document.createElement("article");
      card.className = `review-card ${item.correct ? "correct" : "incorrect"}`;
      const heading = document.createElement("h3");
      heading.textContent = `Question ${item.questionNumber}: ${item.originalQuestion}`;
      const comparison = document.createElement("div");
      comparison.className = "answer-comparison";
      const submitted = document.createElement("div");
      submitted.className = "answer-box";
      const submittedLabel = document.createElement("strong");
      submittedLabel.textContent = "Your answer";
      const submittedText = document.createElement("span");
      submittedText.textContent = item.submittedAnswer;
      submitted.append(submittedLabel, submittedText);
      const correct = document.createElement("div");
      correct.className = "answer-box";
      const correctLabel = document.createElement("strong");
      correctLabel.textContent = "Correct answer";
      const correctText = document.createElement("span");
      correctText.textContent = item.correctAnswer;
      correct.append(correctLabel, correctText);
      comparison.append(submitted, correct);
      const explanation = document.createElement("p");
      explanation.className = "explanation";
      explanation.textContent = `Hint: ${item.explanation}`;
      card.append(heading, comparison);
      if (item.type === "short_long" && item.sectionResults.some((section) => !section.correct)) {
        const sectionNote = document.createElement("p");
        sectionNote.className = "warning-copy";
        sectionNote.textContent = `Check: ${item.sectionResults.filter((section) => !section.correct).map((section) => section.label).join(", ")}`;
        card.appendChild(sectionNote);
      }
      card.appendChild(explanation);
      list.appendChild(card);
    });
  }

  async function initialise() {
    try {
      const sessionId = new URLSearchParams(window.location.search).get("id");
      if (!sessionId) throw new Error("No practice record was requested.");
      const store = await storageApi.createBrowserStore();
      session = await store.get(sessionId);
      if (!session || session.status !== "submitted" || !session.scoreSummary || !Array.isArray(session.review)) {
        throw new Error("The submitted practice record is unavailable.");
      }
      renderSummary();
      renderReview();
      byId("resultPanel").hidden = false;
      byId("wrongAnswersButton").addEventListener("click", () => { currentView = "wrong"; renderReview(); });
      byId("allAnswersButton").addEventListener("click", () => { currentView = "all"; renderReview(); });
    } catch (error) {
      showError("This practice result could not be opened on this browser and device.", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initialise, { once: true });
})();
