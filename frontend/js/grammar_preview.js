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

  const promptTranslations = {
    "What is in your lunch box?": "你的午餐盒裡有甚麼？", "What do you draw with crayons?": "你用蠟筆畫甚麼？", "What do you wear on your feet?": "你在腳上穿甚麼？", "What did Mia find under the sofa?": "Mia 在沙發下面找到甚麼？", "What is your favourite school subject?": "你最喜歡的學科是甚麼？", "What are the children making?": "孩子們正在製作甚麼？", "What do you need for the art lesson?": "美術課需要甚麼？", "Who helps you cross the road?": "誰幫你過馬路？", "Who is baking cookies in the kitchen?": "誰正在廚房焗曲奇？", "Who teaches your class?": "誰教你們班？", "Who scored the winning goal?": "誰踢進了致勝的一球？", "Who has borrowed my blue pen?": "誰借了我的藍色原子筆？", "Who is knocking at the door?": "誰正在敲門？", "Where do you keep your toothbrush?": "你把牙刷放在哪裡？", "Where can we borrow storybooks?": "我們在哪裡可以借故事書？", "Where is the playground?": "遊樂場在哪裡？", "Where did Leo leave his cap?": "Leo 把他的帽子留在哪裡？", "Where do fish live?": "魚住在哪裡？", "Where should we put the recycling?": "我們應該把回收物放在哪裡？", "When do you eat breakfast?": "你甚麼時候吃早餐？", "When is the school concert?": "學校音樂會是甚麼時候？", "When should we water the plants?": "我們甚麼時候應該給植物澆水？", "When did you finish your homework?": "你甚麼時候完成了功課？", "When can we open the birthday present?": "我們甚麼時候可以打開生日禮物？", "When do buses usually arrive?": "巴士通常甚麼時候到達？", "Why are you wearing a raincoat?": "你為甚麼穿著雨衣？", "Why did the baby bird chirp?": "小鳥寶寶為甚麼啾啾叫？", "Why should we wash our hands?": "我們為甚麼應該洗手？", "Why is Ben carrying an umbrella?": "Ben 為甚麼拿著雨傘？", "Why do plants need sunlight?": "植物為甚麼需要陽光？", "Why did the class clap?": "全班為甚麼拍手？", "Which pencil do you want, red or green?": "你想要哪一枝鉛筆，紅色還是綠色？", "Which bus goes to the museum?": "哪一輛巴士去博物館？", "Which game shall we play first?": "我們先玩哪一個遊戲？", "Which jacket belongs to you?": "哪一件外套是你的？", "Which fruit would you like for snack?": "你想吃哪一種水果作小食？", "Which book should I read tonight?": "我今晚應該讀哪一本書？", "Whose lunch box is on the table?": "桌上的午餐盒是誰的？", "Whose shoes are by the door?": "門旁的鞋子是誰的？", "Whose turn is it to roll the dice?": "輪到誰擲骰子？", "Whose dog is wearing the red collar?": "誰的狗戴著紅色頸圈？", "Whose drawing won the prize?": "誰的畫得獎了？", "Whose scarf did you find?": "你找到誰的圍巾？", "How do you get to school?": "你怎樣去學校？", "How can we make the room tidy?": "我們怎樣可以把房間整理整齊？", "How did the glass break?": "玻璃杯怎樣打破的？", "How many stickers do you have?": "你有多少張貼紙？", "How often do you practise the piano?": "你多久練習一次鋼琴？", "How does this toy work?": "這個玩具怎樣運作？", "How are you feeling today?": "你今天感覺怎樣？",
    "I packed ___ sandwiches for the picnic.": "我為野餐準備了幾個三文治。", "There are ___ crayons in the box.": "盒子裡有一些蠟筆。", "We need ___ flour for the cake.": "我們需要一些麵粉做蛋糕。", "She bought ___ apples at the market.": "她在市場買了一些蘋果。", "Would you like ___ soup?": "你想喝一些湯嗎？", "The teacher gave us ___ paper.": "老師給了我們一些紙。", "I have ___ good news for you.": "我有一些好消息告訴你。", "We saw ___ colourful fish.": "我們看見了一些色彩繽紛的魚。", "Do you have ___ questions?": "你有任何問題嗎？", "There isn't ___ cheese left.": "沒有剩下任何芝士。", "Did you see ___ stars last night?": "你昨晚有看見任何星星嗎？", "We don't need ___ more chairs.": "我們不需要更多椅子。", "Are there ___ clean cups?": "有任何乾淨的杯子嗎？", "I cannot find ___ glue.": "我找不到任何膠水。", "Would you like ___ help?": "你需要一些幫忙嗎？", "Have you got ___ homework today?": "你今天有任何功課嗎？", "I read ___ pages before bed.": "我睡前讀了幾頁。", "There are ___ ducks on the pond.": "池塘裡有幾隻鴨子。", "We need ___ volunteers for the game.": "遊戲需要幾位志願者。", "She put ___ coins in her pocket.": "她把幾個硬幣放進口袋。", "Only ___ children stayed after class.": "只有幾個孩子下課後留下來。", "I picked ___ flowers for Mum.": "我摘了幾朵花送給媽媽。", "He has ___ pencils left.": "他還剩下幾枝鉛筆。", "We have ___ minutes before the bell.": "距離響鐘還有幾分鐘。", "Please add ___ milk to my tea.": "請在我的茶裡加一點牛奶。", "There is ___ water in the glass.": "杯子裡有一點水。", "I need ___ time to finish.": "我需要一點時間完成。", "Put ___ salt in the soup.": "在湯裡放一點鹽。", "She has ___ money in her purse.": "她的錢包裡有一點錢。", "The plant needs ___ sunlight.": "植物需要一點陽光。", "We have ___ rice left.": "我們還剩下一點米飯。", "He drank ___ juice after running.": "跑步後他喝了一點果汁。", "How ___ books are on the shelf?": "架子上有多少本書？", "There are ___ stars in the sky.": "天空中有很多星星。", "She has ___ stickers.": "她有很多貼紙。", "How ___ students joined the club?": "有多少名學生加入了社團？", "We saw ___ shells on the beach.": "我們在海灘看見很多貝殼。", "There aren't ___ buses today.": "今天沒有很多巴士。", "He made ___ new friends.": "他交了很多新朋友。", "How ___ eggs do we need?": "我們需要多少隻雞蛋？", "How ___ water should I drink?": "我應該喝多少水？", "There isn't ___ time before lunch.": "午餐前沒有多少時間。", "How ___ rice would you like?": "你想要多少米飯？", "We do not have ___ money today.": "我們今天沒有多少錢。", "Did you use ___ glue?": "你用了很多膠水嗎？", "How ___ milk is in the jug?": "壺裡有多少牛奶？", "There isn't ___ traffic at this hour.": "這個時間交通不太繁忙。", "How ___ homework is left?": "還剩下多少功課？", "Books are ...": "書本是可以逐本數算的。", "Rice is ...": "米飯是不能逐粒作為整體數算的。", "Time is ...": "時間是不能逐個作為整體數算的。", "Grapes are ...": "葡萄是可以逐粒數算的。", "Water is ...": "水是不能逐杯作為整體數算的。", "Students are ...": "學生是可以逐個數算的。"
  };

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

  function displayPrompt(question) {
    if (activeTopic.id !== "question-words") return question.prompt;
    return question.prompt.replace(new RegExp(`^${question.answer}\\b`, "i"), "___");
  }

  function promptMeaning(question) {
    const translation = promptTranslations[question.prompt];
    return translation ? `<br><span class="zh-copy">句子意思：${escapeHtml(translation)}</span>` : "";
  }

  function renderQuestion() {
    const question = sessionQuestions[questionIndex];
    const heading = mode === "quiz" ? "Quiz / Challenge" : "Practice";
    const options = shuffle(question.options);
    byId("lesson").innerHTML = `<section class="practice-card"><div class="practice-header"><div><p class="step-label">${heading}</p><h2>${escapeHtml(activeTopic.title)}</h2></div><p class="progress">Question ${questionIndex + 1} of ${sessionQuestions.length}</p></div><div class="question-visual" aria-hidden="true">${question.visual}</div><p class="prompt">${escapeHtml(displayPrompt(question))}</p><div id="choices" class="choice-list"></div><div id="feedback" aria-live="polite"></div></section>`;
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
    const feedback = byId("feedback");
    if (mode === "quiz") {
      feedback.className = "feedback";
      feedback.innerHTML = `<strong>Answer saved.</strong> <span class="zh-copy">答案已儲存。</span>`;
    } else {
      if (!isCorrect) button.classList.add("wrong");
      feedback.className = `feedback ${isCorrect ? "good" : "try"}`;
      feedback.innerHTML = `<strong>${isCorrect ? "Correct! 做得好！" : `Incorrect. 正確答案是「${escapeHtml(question.answer)}」。`}</strong> ${escapeHtml(question.why)}${question.why_zh ? `<br><span class="zh-copy">${escapeHtml(question.why_zh)}</span>` : ""}${promptMeaning(question)}`;
    }
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
    const review = mode === "quiz" && mistakes.length ? `<div class="mistake-list"><h3>Review mistakes</h3>${mistakes.map((item) => `<article><p><strong>${escapeHtml(item.question.prompt)}</strong></p><p>Your answer: ${escapeHtml(item.selected)}</p><p>Correct answer: ${escapeHtml(item.correct)}</p><p>${escapeHtml(item.question.why)}${item.question.why_zh ? `<br><span class="zh-copy">${escapeHtml(item.question.why_zh)}</span>` : ""}${promptMeaning(item.question)}</p></article>`).join("")}</div>` : "";
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
