const AI_TEACHER_DISABLED_MESSAGE =
  "AI Teacher is temporarily unavailable while the content generation system is being redesigned.";

document.addEventListener("DOMContentLoaded", () => {
  const txt = document.getElementById("question");
  const btn = document.getElementById("btn-send");
  const chat = document.getElementById("chat-area");

  if (txt) {
    txt.value = "";
    txt.placeholder = "AI Teacher is temporarily unavailable.";
    txt.disabled = true;
  }

  if (btn) {
    btn.textContent = "Temporarily Disabled";
    btn.disabled = true;
  }

  if (chat) {
    const div = document.createElement("div");
    div.className = "bubble ai";
    div.textContent = "AI: " + AI_TEACHER_DISABLED_MESSAGE;
    chat.appendChild(div);
  }
});
