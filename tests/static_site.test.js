const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

test("all local HTML asset references resolve", () => {
  const htmlFiles = [path.join(root, "index.html")]
    .concat(fs.readdirSync(path.join(root, "frontend"))
      .filter((name) => name.endsWith(".html"))
      .map((name) => path.join(root, "frontend", name)));
  const failures = [];
  const referencePattern = /(?:src|href)=["']([^"'#?]+)["']/gi;

  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(referencePattern)) {
      const reference = match[1];
      if (/^(?:[a-z]+:|\/\/)/i.test(reference)) continue;
      const target = path.resolve(path.dirname(file), reference);
      if (!fs.existsSync(target)) {
        failures.push(`${path.relative(root, file)} -> ${reference}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});

test("dictation playback preserves pause position and resets only on stop or completion", () => {
  const source = fs.readFileSync(path.join(root, "frontend", "dictation_practice.html"), "utf8");

  assert.match(source, /sp\.onclick=\(\)=>\{stopEverything\(false\);playbackPositions\[i\]=idx/);
  assert.match(source, /if\(play\.dataset\.state==='playing'\)\{requestPause\(\);return\}/);
  assert.match(source, /function requestPause\(\)\{pauseRequested=true;if\(!currentUtterance\)stopEverything\(true\)\}/);
  assert.match(source, /const start=Math\.min\(playbackPositions\[i\]\|\|0[\s\S]*?stopEverything\(false\)/);
  assert.match(source, /stop\.onclick=\(\)=>\{playbackPositions\[i\]=0;stopEverything\(false\)\}/);
  assert.match(source, /function finishPlayback\(sentenceIndex,generation\)\{[\s\S]*?playbackPositions\[sentenceIndex\]=0/);
});

test("English menu and Grammar Practice preserve the learning-first navigation hierarchy", () => {
  const englishMenu = fs.readFileSync(path.join(root, "frontend", "eng.html"), "utf8");
  assert.ok(englishMenu.indexOf('href="grammar.html"') < englishMenu.indexOf('href="grammar_practice.html"'));
  assert.match(englishMenu, /默書：句子練習/);
  assert.match(englishMenu, /默書句子練習/);
  assert.doesNotMatch(englishMenu, /點書/);

  const practicePage = fs.readFileSync(path.join(root, "frontend", "grammar_practice.html"), "utf8");
  const practiceSection = practicePage.slice(
    practicePage.indexOf('class="setup-panel practice-mode-section"'),
    practicePage.indexOf('class="setup-panel topic-quiz-section"')
  );
  assert.match(practiceSection, /Start 20 Questions/);
  assert.doesNotMatch(practiceSection, /Grammar Topic|grammarTopicSelect/);
  assert.match(practicePage, /Grammar Topic Quiz \/ Challenge/);
  assert.match(practicePage, /id="grammarTopicSelect"/);
  assert.match(practicePage, /Quiz \/ Challenge/);
  assert.doesNotMatch(practicePage, /Open Practice &amp; Quiz/);

  const practiceScript = fs.readFileSync(path.join(root, "frontend", "js", "grammar_practice.js"), "utf8");
  assert.match(practiceScript, /grammar_practice_choice\.html\?topic=.*&mode=choice_quiz&autostart=1/);
});
