"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const core = require("../frontend/js/grammar_practice_core.js");
const data = require("../frontend/data/grammar_practice_choice.json");

const topics = new Map(data.topics.map((topic) => [topic.id, topic]));
const questionWords = topics.get("question-words").questionBank;
const quantifiers = topics.get("quantifiers").questionBank;

function validateBank(bank, name) {
  assert.equal(new Set(bank.map((item) => item.id)).size, bank.length, `${name} IDs must be unique`);
  assert.equal(new Set(bank.map((item) => item.prompt.trim().toLowerCase())).size, bank.length, `${name} prompts must be unique`);
  bank.forEach((item) => {
    assert.ok(item.answer && item.options.includes(item.answer), `${item.id} answer must be an option`);
    assert.equal(new Set(item.options).size, item.options.length, `${item.id} options must be unique`);
    assert.ok(item.why && item.why_zh && item.prompt_zh, `${item.id} needs bilingual support`);
  });
}

assert.equal(questionWords.length, 50);
assert.equal(quantifiers.length, 54);
validateBank(questionWords, "Question Words");
validateBank(quantifiers, "Quantifiers");
for (const word of ["What", "Who", "Where", "When", "Why", "Which", "Whose", "How"]) assert.ok(questionWords.filter((item) => item.answer === word).length >= 6);
for (const target of ["some", "any", "a few", "a little", "many", "much"]) assert.ok(quantifiers.some((item) => item.answer === target));
assert.equal(quantifiers.some((item) => ["a lot of", "few", "little"].includes(item.answer)), false);
assert.equal(quantifiers.some((item) => item.options.some((option) => ["a lot of", "few", "little"].includes(option))), false);
for (const bank of [questionWords, quantifiers]) for (const count of [12, 10]) {
  const selected = core.selectChoiceQuestions(bank, count, () => 0.314159);
  assert.equal(selected.length, count); assert.equal(new Set(selected.map((item) => item.id)).size, count);
}
const script = fs.readFileSync("frontend/js/grammar_practice_choice.js", "utf8");
assert.match(script, /const selectedMode = "choice_quiz"/);
assert.match(script, /const count = 10/);
assert.match(script, /if \(!quiz && button\.textContent === question\.answer\)/);
assert.match(script, /if \(quiz\) feedback\.textContent = "Answer saved\. 答案已儲存。"/);
assert.doesNotMatch(script, /prompt_zh/);
assert.match(script, /submitChoiceSession/);
assert.match(script, /"Finish" : "Next →"/);
assert.doesNotMatch(fs.readFileSync("frontend/grammar_practice.html", "utf8"), /Open Practice &amp; Quiz/);
console.log("Grammar Practice choice banks: Question Words 50; Quantifiers 54; session and feedback contracts valid.");
