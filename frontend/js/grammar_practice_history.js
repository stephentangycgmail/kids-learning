(function () {
  "use strict";

  const core = window.GrammarPracticeCore;
  const storageApi = window.GrammarPracticeStorage;
  let records = [];

  function byId(id) { return document.getElementById(id); }
  function dateTime(value) {
    return value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";
  }
  function modeLabel(mode) {
    return { short_long: "Short & Long Answer", rearrangement: "Sentence Rearrangement", mixed: "Mixed Practice" }[mode] || mode;
  }
  function statusLabel(status) {
    return { submitted: "Submitted", in_progress: "In Progress", abandoned: "Abandoned" }[status] || status;
  }
  function showError(message, error) {
    const panel = byId("historyMessage");
    panel.textContent = message;
    panel.hidden = false;
    if (error) console.error(message, error);
  }
  function detailBlock(label, value) {
    const block = document.createElement("div");
    const title = document.createElement("p");
    title.textContent = label;
    const text = document.createElement("strong");
    text.textContent = value;
    block.append(title, text);
    return block;
  }

  function render() {
    const filter = byId("historyFilter").value;
    const visible = records.filter((record) => filter === "all" || record.status === filter || record.mode === filter);
    const list = byId("historyList");
    list.textContent = "";
    if (!visible.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No practice records match this filter.";
      list.appendChild(empty);
      return;
    }
    visible.forEach((record) => {
      const card = document.createElement("article");
      card.className = "history-card";
      const identity = document.createElement("div");
      const heading = document.createElement("h2");
      heading.textContent = modeLabel(record.mode);
      const topic = document.createElement("p");
      topic.textContent = record.topicLabel || record.topic;
      const badge = document.createElement("span");
      badge.className = `status-badge status-${record.status}`;
      badge.textContent = statusLabel(record.status);
      identity.append(heading, topic, badge);
      card.appendChild(identity);
      card.appendChild(detailBlock("Started", dateTime(record.startedAt)));
      card.appendChild(detailBlock(record.status === "submitted" ? "Completed" : record.status === "abandoned" ? "Abandoned" : "Last saved", dateTime(record.submittedAt || record.abandonedAt || record.lastSavedAt)));
      const result = record.status === "submitted" && record.scoreSummary
        ? `${record.scoreSummary.fullyCorrect} / ${record.scoreSummary.totalQuestions}`
        : "—";
      card.appendChild(detailBlock("Score / Duration", `${result} · ${core.formatDuration(core.durationSeconds(record))}`));
      const action = document.createElement("a");
      action.className = "button button-primary history-action";
      if (record.status === "submitted") {
        action.href = `grammar_practice_result.html?id=${encodeURIComponent(record.sessionId)}`;
        action.textContent = "View Result";
      } else if (record.status === "in_progress") {
        action.href = "grammar_practice.html";
        action.textContent = "Resume";
      } else {
        action.href = "grammar_practice.html";
        action.textContent = "New Practice";
      }
      card.appendChild(action);
      list.appendChild(card);
    });
  }

  async function initialise() {
    try {
      const store = await storageApi.createBrowserStore();
      records = await store.getAll();
      records.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
      render();
      byId("historyFilter").addEventListener("change", render);
    } catch (error) {
      showError("Practice History could not be opened in this browser.", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initialise, { once: true });
})();
