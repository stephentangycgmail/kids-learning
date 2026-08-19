"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const preview = require("../frontend/data/grammar_preview_topics.json");

const topics = new Map(preview.topics.map((topic) => [topic.id, topic]));
const questionWords = topics.get("question-words").questionBank;
const quantifiers = topics.get("quantifiers").questionBank;

function assertUniqueIds(bank, name) {
  const ids = bank.map((question) => question.id);
  assert.equal(new Set(ids).size, ids.length, `${name} question IDs must be unique`);
}

function assertQuestionStructure(bank, name) {
  const prompts = bank.map((question) => question.prompt.trim().toLowerCase());
  assert.equal(new Set(prompts).size, prompts.length, `${name} question prompts must not be duplicated`);
  for (const question of bank) {
    assert.ok(question.answer, `${question.id} must have an answer`);
    assert.ok(question.options.includes(question.answer), `${question.id} answer must be an option`);
    assert.equal(new Set(question.options).size, question.options.length, `${question.id} options must be unique`);
  }
}

function hasAnswer(prompt, answer) {
  const escaped = answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(prompt);
}

assert.equal(questionWords.length, 50);
assert.equal(quantifiers.length, 54);
assertUniqueIds(questionWords, "Question Words");
assertUniqueIds(quantifiers, "Quantifiers");
assertQuestionStructure(questionWords, "Question Words");
assertQuestionStructure(quantifiers, "Quantifiers");

for (const word of ["What", "Who", "Where", "When", "Why", "Which", "Whose", "How"]) {
  assert.ok(questionWords.filter((question) => question.answer === word).length >= 6, `${word} needs balanced coverage`);
}

for (const target of ["some", "any", "a few", "a little", "many", "much"]) {
  assert.ok(quantifiers.some((question) => question.answer === target), `Missing ${target}`);
}
assert.equal(quantifiers.some((question) => ["a lot of", "few", "little"].includes(question.answer)), false);
assert.equal(quantifiers.some((question) => question.options.some((option) => ["a lot of", "few", "little"].includes(option))), false);
assert.ok(quantifiers.some((question) => question.stage === "Countable or uncountable"));
assert.ok(questionWords.every((question) => question.why_zh));
assert.ok(quantifiers.every((question) => question.why_zh));
assert.ok(questionWords.every((question) => question.prompt.startsWith(`${question.answer} `)));
for (const question of questionWords) {
  const maskedPrompt = question.prompt.replace(new RegExp(`^${question.answer}\\b`, "i"), "___");
  assert.match(maskedPrompt, /^___\s/);
  assert.equal(hasAnswer(maskedPrompt, question.answer), false, `${question.id} must not reveal its answer`);
}
for (const question of quantifiers) {
  if (question.stage !== "Countable or uncountable") {
    assert.ok(question.prompt.includes("___"), `${question.id} must use a blank`);
  }
  assert.equal(hasAnswer(question.prompt, question.answer), false, `${question.id} must not reveal its answer`);
}

const rewrittenQuestions = new Map([
  ["qw-who-04", { prompt: "Who kicked the ball into the goal?", answer: "Who" }],
  ["qw-where-06", { prompt: "Where should we put the recycling bin?", answer: "Where" }],
  ["qw-how-03", { prompt: "How did the glass break after Ben dropped it?", answer: "How" }],
  ["q-some-05", { prompt: "I made soup for you. Would you like ___?", answer: "some" }],
  ["q-any-07", { prompt: "You don't need ___ help with this puzzle.", answer: "any" }],
  ["q-any-08", { prompt: "You do not have ___ homework today.", answer: "any" }],
  ["q-countable-03", { prompt: "Time, as an amount, is ...", answer: "Uncountable" }]
]);
const questionsById = new Map([...questionWords, ...quantifiers].map((question) => [question.id, question]));
for (const [id, expected] of rewrittenQuestions) {
  const question = questionsById.get(id);
  assert.ok(question, `${id} must remain in its bank`);
  assert.equal(question.prompt, expected.prompt, `${id} must retain its reviewed wording`);
  assert.equal(question.answer, expected.answer, `${id} must retain its reviewed answer`);
  assert.ok(question.why && question.why_zh, `${id} must retain bilingual explanations`);
}
assert.equal(questionsById.get("q-any-08").options.includes("much"), false, "q-any-08 must not offer much");

const previewScript = fs.readFileSync("frontend/js/grammar_preview.js", "utf8");
assert.match(previewScript, /sessionQuestions = shuffle\(questionBank\(activeTopic\)\)\.slice\(0, mode === "quiz" \? 10 : 12\);/);
assert.match(previewScript, /const options = shuffle\(question\.options\);/);
assert.match(previewScript, /function displayPrompt\(question\)/);
assert.match(previewScript, /const promptTranslations = \{/);
assert.match(previewScript, /function promptMeaning\(question\)/);
for (const question of [...questionWords, ...quantifiers]) {
  assert.ok(previewScript.includes(JSON.stringify(question.prompt)), `${question.id} needs a Traditional Chinese sentence meaning`);
}
assert.match(previewScript, /return question\.prompt\.replace\(new RegExp\(`\^\$\{question\.answer\}\\\\b`, "i"\), "___"\);/);
assert.match(previewScript, /<h2>\$\{escapeHtml\(activeTopic\.title\)\}<\/h2>/);
assert.doesNotMatch(previewScript, /escapeHtml\(question\.stage/);
assert.doesNotMatch(previewScript, /if \(mode === "quiz"\) return nextQuestion\(\);/);
assert.match(previewScript, /<strong>Answer saved\.<\/strong> <span class="zh-copy">答案已儲存。<\/span>/);
assert.match(previewScript, /mode === "practice" && choice\.textContent === question\.answer/);
assert.match(previewScript, /const review = mode === "quiz" && mistakes\.length/);
assert.match(previewScript, /const record = \{ mode, completedAt: new Date\(\)\.toISOString\(\), score, total, percentage:/);

console.log("Grammar Preview banks: Question Words 50; Quantifiers 54; IDs, coverage, and session behavior contracts valid.");
