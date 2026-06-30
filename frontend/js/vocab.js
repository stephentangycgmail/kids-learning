document.addEventListener("DOMContentLoaded", async () => {
  const vocabList = document.getElementById("vocab-list");
  const selectedWordDiv = document.getElementById("selected-word");
  const btnAsk = document.getElementById("btn-ask-word");
  const answerDiv = document.getElementById("vocab-answer");

  let selectedWord = null;
  let vocabData = {};
  let vocabHints = {};

  function showAnswer(word) {
    const entry = vocabData[word] || {};
    const hint = vocabHints[word] || {};
    const parts = [
      entry.word || word,
      entry.pos ? "Part of speech: " + entry.pos : "",
      entry.meaning_zh || hint.cn || "",
      entry.example_en || hint.usage || "",
      entry.example_zh || "",
      hint.tenses || "",
    ].filter(Boolean);

    answerDiv.textContent = parts.length
      ? parts.join("\n")
      : "No local explanation is available for this word yet.";
  }

  try {
    vocabData = await KidsAPI.fetchJson("data/vocab.json");
  } catch (err) {
    vocabData = {};
  }

  try {
    vocabHints = await KidsAPI.fetchJson("data/vocab_ai.json");
  } catch (err) {
    vocabHints = {};
  }

  const words = Object.keys(vocabData).length
    ? Object.keys(vocabData)
    : Object.keys(vocabHints).slice(0, 30);

  vocabList.innerHTML = "";
  words.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    li.addEventListener("click", () => {
      selectedWord = word;
      selectedWordDiv.textContent = "Selected word: " + word;
      answerDiv.textContent = "";
    });
    vocabList.appendChild(li);
  });

  if (btnAsk) {
    btnAsk.addEventListener("click", () => {
      if (!selectedWord) {
        answerDiv.textContent = "Select a word first.";
        return;
      }
      showAnswer(selectedWord);
    });
  }
});
