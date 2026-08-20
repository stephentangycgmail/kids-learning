"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const dataDirectory = path.join(__dirname, "..", "frontend", "data");
const catalog = require(path.join(dataDirectory, "grammar_catalog.json"));

assert.ok(Array.isArray(catalog.lessons));
assert.equal(new Set(catalog.lessons.map((lesson) => lesson.id)).size, catalog.lessons.length, "Grammar catalog IDs must be unique");
assert.equal(new Set(catalog.lessons.map((lesson) => lesson.title)).size, catalog.lessons.length, "Grammar catalog titles must be unique");

const expectedCategories = {
  "present-simple": "tenses",
  "present-continuous": "tenses",
  "past-simple": "tenses",
  "future-simple": "tenses",
  "verb-to-be": "be-structures",
  "can-cant": "modal-structures",
  "must-mustnt": "modal-structures",
  "there-is-are": "sentence-patterns",
  "question-words": "question-forms",
  "quantifiers": "quantity-determiners"
};

for (const entry of catalog.lessons) {
  assert.equal(entry.category, expectedCategories[entry.id], `${entry.id} must retain its approved primary category`);
}

for (const entry of catalog.lessons) {
  assert.ok(fs.existsSync(path.join(dataDirectory, entry.file)), `${entry.id} must reference an existing lesson file`);
  const lesson = require(path.join(dataDirectory, entry.file));
  assert.ok(lesson.id && lesson.title && Array.isArray(lesson.examples), `${entry.id} must retain the production lesson shape`);
}

const questionWords = require(path.join(dataDirectory, "grammar_question_words_lesson.json"));
const quantifiers = require(path.join(dataDirectory, "grammar_quantifiers_lesson.json"));

assert.equal(catalog.lessons.find((lesson) => lesson.id === "question-words").file, "grammar_question_words_lesson.json");
assert.equal(catalog.lessons.find((lesson) => lesson.id === "quantifiers").file, "grammar_quantifiers_lesson.json");
assert.deepEqual(questionWords.visual_learning.cards.map((card) => card.word), ["What", "Who", "Where", "When", "Why", "Which", "Whose", "How"]);
assert.deepEqual(quantifiers.visual_learning.cards.map((card) => card.word).sort(), ["a few", "a little", "any", "many", "much", "some"]);
assert.equal(JSON.stringify(quantifiers).includes("a lot of"), false);
assert.equal(quantifiers.visual_learning.cards.some((card) => card.word === "few" || card.word === "little"), false);

const waterLevels = new Map(quantifiers.visual_learning.cards
  .filter((card) => card.visual === "water-glass")
  .map((card) => [card.word, card.water_level]));
assert.equal(waterLevels.get("a little"), 18);
assert.equal(waterLevels.get("much"), 85);

for (const lesson of [questionWords, quantifiers]) {
  assert.ok(lesson.visual_learning.intro_zh, `${lesson.title} needs Traditional Chinese visual learning support`);
  assert.ok(lesson.examples.every((example) => example.chinese && example.reason_cn), `${lesson.title} examples need Chinese support`);
  assert.ok(lesson.guided_practice.length >= 6 && lesson.guided_practice.length <= 8, `${lesson.title} needs a short guided mini-practice`);
  for (const question of lesson.guided_practice) {
    assert.ok(question.answer && question.options.includes(question.answer), `${lesson.title} guided practice answers must be valid`);
    assert.equal(new Set(question.options).size, question.options.length, `${lesson.title} guided practice options must be unique`);
    assert.ok(question.why && question.why_zh, `${lesson.title} guided practice needs bilingual feedback`);
  }
}

const grammarRenderer = fs.readFileSync(path.join(__dirname, "..", "frontend", "grammar.html"), "utf8");
assert.match(grammarRenderer, /visual_learning: data && data\.visual_learning/);
assert.match(grammarRenderer, /function renderVisualLearning/);
assert.match(grammarRenderer, /function renderGuidedPractice/);
assert.match(grammarRenderer, /water-glass-fill/);
assert.match(grammarRenderer, /lesson\.category === category/);

console.log("Production Grammar catalog, visual learning cards, water comparison, and guided mini-practice contracts valid.");
