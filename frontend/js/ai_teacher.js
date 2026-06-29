document.addEventListener("DOMContentLoaded", () => {
  const txt = document.getElementById("question");
  const btn = document.getElementById("btn-send");
  const chat = document.getElementById("chat-area");

  let history = [];

  btn.addEventListener("click", async () => {
    const q = txt.value.trim();
    if (!q) return;

    appendBubble("You", q);
    txt.value = "";
    appendBubble("AI", "Thinking...");

    try {
      const res = await callTeacherAPI(q, history);
      const reply = res.reply;
      history.push({ role: "user", content: q });
      history.push({ role: "assistant", content: reply });

      replaceLastBubble("AI", reply);
    } catch (e) {
      replaceLastBubble("AI", "Error: " + e.message);
    }
  });

  function appendBubble(who, text) {
    const div = document.createElement("div");
    div.className = "bubble " + who.toLowerCase();
    div.textContent = who + ": " + text;
    chat.appendChild(div);
  }

  function replaceLastBubble(who, text) {
    const bubbles = chat.querySelectorAll(".bubble." + who.toLowerCase());
    const last = bubbles[bubbles.length - 1];
    if (last) last.textContent = who + ": " + text;
  }
});
