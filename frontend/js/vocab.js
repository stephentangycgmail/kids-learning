document.addEventListener("DOMContentLoaded", () => {
  const vocabList = document.getElementById("vocab-list");
  const selectedWordDiv = document.getElementById("selected-word");
  const btnAsk = document.getElementById("btn-ask-word");
  const answerDiv = document.getElementById("vocab-answer");

  let selectedWord = null;
  let history = [];

  // demo words, later replace by fetching data/vocab.json
  const words = ["elephant", "happy", "school"];

  words.forEach(w => {
    const li = document.createElement("li");
    li.textContent = w;
    li.addEventListener("click", () => {
      selectedWord = w;
      selectedWordDiv.textContent = "Selected word: " + w;
    });
    vocabList.appendChild(li);
  });

  btnAsk.addEventListener("click", async () => {
    if (!selectedWord) return;
    answerDiv.textContent = "Thinking...";

    const q = `請用小三小四程度講解英文單字 "${selectedWord}" 的意思和例句。`;

    try {
      const res = await callTeacherAPI(q, history);
      const reply = res.reply;
      history.push({ role: "user", content: q });
      history.push({ role: "assistant", content: reply });

      answerDiv.textContent = reply;
    } catch (e) {
      answerDiv.textContent = "Error: " + e.message;
    }
  });
});
