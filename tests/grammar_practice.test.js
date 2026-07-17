const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const core = require("../frontend/js/grammar_practice_core.js");
const storageApi = require("../frontend/js/grammar_practice_storage.js");

const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "frontend", "data");
const manifest = JSON.parse(fs.readFileSync(path.join(dataDir, "grammar_practice_manifest.json"), "utf8"));
const shortBank = JSON.parse(fs.readFileSync(path.join(dataDir, manifest.banks.short_long), "utf8"));
const rearrangementBank = JSON.parse(fs.readFileSync(path.join(dataDir, manifest.banks.rearrangement), "utf8"));
const banks = { shortLong: shortBank.questions, rearrangement: rearrangementBank.questions };
const allTopic = manifest.topics.find((topic) => topic.id === "all");

function predictableRandom() { return 0.314159; }

test("single-mode selection returns exactly 20 unique questions", () => {
  for (const mode of ["short_long", "rearrangement"]) {
    const selected = core.selectQuestions({ mode, topic: allTopic, banks, rng: predictableRandom });
    assert.equal(selected.length, 20);
    assert.equal(new Set(selected.map((item) => item.id)).size, 20);
    assert.ok(selected.every((item) => item.type === mode));
  }
});

test("mixed selection returns 10 questions of each type", () => {
  const selected = core.selectQuestions({ mode: "mixed", topic: allTopic, banks, rng: predictableRandom });
  assert.equal(selected.length, 20);
  assert.equal(selected.filter((item) => item.type === "short_long").length, 10);
  assert.equal(selected.filter((item) => item.type === "rearrangement").length, 10);
});

test("selection excludes recently used questions when enough alternatives exist", () => {
  const recentIds = banks.shortLong.slice(0, 100).map((item) => item.id);
  const selected = core.selectQuestions({
    mode: "short_long", topic: allTopic, banks, recentIds, rng: predictableRandom,
  });
  assert.equal(selected.some((item) => recentIds.includes(item.id)), false);
});

test("session saves an exact ISO start timestamp and non-original token order", () => {
  const now = new Date("2026-07-17T08:09:10.000Z");
  const questions = core.selectQuestions({ mode: "rearrangement", topic: allTopic, banks, rng: predictableRandom });
  const session = core.createSession({ mode: "rearrangement", topic: allTopic, questions, now, rng: predictableRandom });
  assert.equal(session.startedAt, now.toISOString());
  assert.equal(session.status, "in_progress");
  session.questionSnapshots.forEach((question) => {
    assert.notDeepEqual(question.shuffledTokenIds, question.tokens.map((token) => token.id));
  });
});

test("memory storage autosaves answers and restores an unfinished session", async () => {
  const question = banks.shortLong[0];
  const session = core.createSession({ mode: "short_long", topic: allTopic, questions: [question] });
  const store = storageApi.createMemoryStore();
  await store.save(session);
  session.answers[question.id] = { sections: { short_yes: { sy_pronoun: question.expectedPronoun } } };
  session.lastSavedAt = new Date(Date.now() + 1000).toISOString();
  await store.save(session);
  const restored = await store.getActive();
  assert.equal(restored.sessionId, session.sessionId);
  assert.equal(restored.answers[question.id].sections.short_yes.sy_pronoun, question.expectedPronoun);
});

test("storage ignores malformed records when restoring history", async () => {
  const valid = core.createSession({ mode: "short_long", topic: allTopic, questions: [banks.shortLong[0]] });
  const store = storageApi.createMemoryStore([valid, { sessionId: "broken", status: "in_progress" }]);
  const originalError = console.error;
  console.error = () => {};
  try {
    const records = await store.getAll();
    assert.deepEqual(records.map((item) => item.sessionId), [valid.sessionId]);
  } finally {
    console.error = originalError;
  }
});

test("submitted records are locked and cannot be changed", async () => {
  const question = banks.rearrangement[0];
  const session = core.createSession({ mode: "rearrangement", topic: allTopic, questions: [question] });
  const store = storageApi.createMemoryStore();
  await store.save(session);
  const submitted = core.submitSession(session, new Date("2026-07-17T10:00:00.000Z"));
  await store.save(submitted);
  submitted.answers[question.id] = { tokenIds: [question.tokens[0].id] };
  await assert.rejects(() => store.save(submitted), /read-only/);
});

test("scoring records full-question and section-level results", () => {
  const short = banks.shortLong[0];
  const rearrangement = banks.rearrangement[0];
  const session = core.createSession({ mode: "mixed", topic: allTopic, questions: [short, rearrangement] });
  session.answers[short.id] = { sections: {} };
  short.sections.forEach((section) => {
    session.answers[short.id].sections[section.id] = {};
    section.blanks.forEach((item) => {
      session.answers[short.id].sections[section.id][item.id] = item.correct;
    });
  });
  session.answers[rearrangement.id] = { tokenIds: rearrangement.tokens.map((token) => token.id) };
  const result = core.scoreSession(session);
  assert.equal(result.summary.fullyCorrect, 2);
  assert.equal(result.summary.correctSections, 4);
  assert.equal(result.summary.totalSections, 4);
  assert.equal(result.summary.unansweredQuestions, 0);
});

test("unanswered questions are counted without revealing a score during practice", () => {
  const session = core.createSession({ mode: "mixed", topic: allTopic, questions: [banks.shortLong[0], banks.rearrangement[0]] });
  assert.equal(core.answeredCount(session), 0);
  assert.equal(core.scoreSession(session).summary.unansweredQuestions, 2);
  assert.equal(session.scoreSummary, null);
});

test("duration calculation uses the exact submitted timestamp", () => {
  const session = core.createSession({
    mode: "short_long", topic: allTopic, questions: [banks.shortLong[0]],
    now: new Date("2026-07-17T10:00:00.000Z"),
  });
  const submitted = core.submitSession(session, new Date("2026-07-17T10:02:05.000Z"));
  assert.equal(core.durationSeconds(submitted), 125);
  assert.equal(core.formatDuration(125), "2m 5s");
});

test("rearrangement answers preserve duplicate-token identity and support remove and clear", () => {
  const question = banks.rearrangement.find((item) => {
    const textCounts = item.tokens.reduce((counts, token) => counts.set(token.text, (counts.get(token.text) || 0) + 1), new Map());
    return Array.from(textCounts.values()).some((count) => count > 1);
  });
  assert.ok(question, "generated bank should contain a sentence with duplicate token text");
  const repeatedText = question.tokens.find((token, index, items) => items.some((other, otherIndex) => otherIndex !== index && other.text === token.text)).text;
  const repeatedIds = question.tokens.filter((token) => token.text === repeatedText).map((token) => token.id);
  assert.equal(new Set(repeatedIds).size, repeatedIds.length);
  let selectedIds = repeatedIds.slice();
  selectedIds = selectedIds.filter((id) => id !== repeatedIds[0]);
  assert.deepEqual(selectedIds, repeatedIds.slice(1));
  selectedIds = [];
  assert.deepEqual(selectedIds, []);
});

test("a result snapshot remains stable after source question data changes", () => {
  const source = JSON.parse(JSON.stringify(banks.shortLong[0]));
  const session = core.createSession({ mode: "short_long", topic: allTopic, questions: [source] });
  const originalText = session.questionSnapshots[0].questionText;
  source.questionText = "Changed bank content";
  assert.equal(session.questionSnapshots[0].questionText, originalText);
});

test("history records are sorted newest first and retain all statuses", async () => {
  function record(id, status, startedAt) {
    return {
      sessionId: id, schemaVersion: 1, mode: "short_long", topic: "all",
      topicLabel: "All Topics", questionIds: [], questionSnapshots: [], answers: {},
      currentQuestionIndex: 0, startedAt, lastSavedAt: startedAt, status,
      submittedAt: status === "submitted" ? startedAt : null,
      abandonedAt: status === "abandoned" ? startedAt : null,
      scoreSummary: status === "submitted" ? {} : null,
      review: status === "submitted" ? [] : null,
    };
  }
  const store = storageApi.createMemoryStore([
    record("old", "abandoned", "2026-07-16T10:00:00.000Z"),
    record("new", "in_progress", "2026-07-17T10:00:00.000Z"),
    record("middle", "submitted", "2026-07-16T20:00:00.000Z"),
  ]);
  const records = await store.getAll();
  assert.deepEqual(records.map((item) => item.sessionId), ["new", "middle", "old"]);
  assert.deepEqual(new Set(records.map((item) => item.status)), new Set(["in_progress", "submitted", "abandoned"]));
});

test("manifest paths resolve under the GitHub Pages frontend subpath", () => {
  Object.values(manifest.banks).forEach((filename) => {
    assert.equal(fs.existsSync(path.join(dataDir, filename)), true);
  });
  for (const page of ["grammar_practice.html", "grammar_practice_result.html", "grammar_practice_history.html"]) {
    assert.equal(fs.existsSync(path.join(root, "frontend", page)), true);
  }
});
