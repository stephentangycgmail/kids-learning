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

assert.equal(questionWords.length, 50);
assert.equal(quantifiers.length, 54);
assertUniqueIds(questionWords, "Question Words");
assertUniqueIds(quantifiers, "Quantifiers");

for (const word of ["What", "Who", "Where", "When", "Why", "Which", "Whose", "How"]) {
  assert.ok(questionWords.filter((question) => question.answer === word).length >= 6, `${word} needs balanced coverage`);
}

for (const target of ["some", "any", "a few", "a little", "many", "much"]) {
  assert.ok(quantifiers.some((question) => question.answer === target), `Missing ${target}`);
}
assert.equal(quantifiers.some((question) => ["a lot of", "few", "little"].includes(question.answer)), false);
assert.ok(quantifiers.some((question) => question.stage === "Countable or uncountable"));
assert.ok(questionWords.every((question) => question.why_zh));
assert.ok(quantifiers.every((question) => question.why_zh));

const previewScript = fs.readFileSync("frontend/js/grammar_preview.js", "utf8");
assert.match(previewScript, /sessionQuestions = shuffle\(questionBank\(activeTopic\)\)\.slice\(0, mode === "quiz" \? 10 : 12\);/);
assert.match(previewScript, /const options = shuffle\(question\.options\);/);
assert.match(previewScript, /if \(mode === "quiz"\) return nextQuestion\(\);/);
assert.match(previewScript, /mode === "practice" && choice\.textContent === question\.answer/);
assert.match(previewScript, /const review = mode === "quiz" && mistakes\.length/);
assert.match(previewScript, /const record = \{ mode, completedAt: new Date\(\)\.toISOString\(\), score, total, percentage:/);

console.log("Grammar Preview banks: Question Words 50; Quantifiers 54; IDs, coverage, and session behavior contracts valid.");
