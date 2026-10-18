const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const pageSource = fs.readFileSync(
  path.resolve(__dirname, "..", "frontend", "dictation_practice.html"),
  "utf8"
);
const pageScript = [...pageSource.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((source) => source.includes("function playTokens"));

function createElement(tagName = "div") {
  const classes = new Set();
  const element = {
    tagName: tagName.toUpperCase(),
    children: [],
    parentElement: null,
    dataset: {},
    style: {},
    textContent: "",
    disabled: false,
    appendChild(child) {
      child.parentElement = this;
      this.children.push(child);
      return child;
    },
    append(...children) {
      for (const child of children) {
        if (typeof child === "string") this.children.push(child);
        else this.appendChild(child);
      }
    },
    closest(selector) {
      let current = this;
      while (current) {
        if (selector.startsWith(".") && current.classList.contains(selector.slice(1))) return current;
        current = current.parentElement;
      }
      return null;
    },
    querySelectorAll(selector) {
      return descendants(this).filter((child) => matches(child, selector));
    },
    getBoundingClientRect() {
      return { top: 20, bottom: 30, left: 20, width: 10, height: 10 };
    },
  };
  Object.defineProperty(element, "className", {
    get: () => [...classes].join(" "),
    set: (value) => {
      classes.clear();
      String(value).split(/\s+/).filter(Boolean).forEach((name) => classes.add(name));
    },
  });
  element.classList = {
    add: (...names) => names.forEach((name) => classes.add(name)),
    remove: (...names) => names.forEach((name) => classes.delete(name)),
    contains: (name) => classes.has(name),
    toggle: (name) => {
      if (classes.has(name)) {
        classes.delete(name);
        return false;
      }
      classes.add(name);
      return true;
    },
  };
  return element;
}

function descendants(element) {
  const result = [];
  for (const child of element.children) {
    if (typeof child === "string") continue;
    result.push(child, ...descendants(child));
  }
  return result;
}

function matches(element, selector) {
  return selector.startsWith(".") && element.classList.contains(selector.slice(1));
}

function createHarness(sentence) {
  const utterances = [];
  const container = createElement();
  const elements = { sentencesContainer: container, "vocab-popup": createElement() };
  class SpeechSynthesisUtterance {
    constructor(text) {
      this.text = text;
    }
  }
  const speechSynthesis = {
    cancelCount: 0,
    cancel() { this.cancelCount += 1; },
    getVoices() { return [{ lang: "en-US", name: "Mock English" }]; },
    speak(utterance) { utterances.push(utterance); },
  };
  const document = {
    addEventListener() {},
    createElement,
    getElementById(id) { return elements[id] || null; },
    querySelectorAll(selector) {
      return descendants(container).filter((element) => matches(element, selector));
    },
  };
  const context = vm.createContext({
    URLSearchParams,
    clearTimeout,
    console,
    document,
    fetch: async () => { throw new Error("Unexpected fetch"); },
    innerWidth: 1024,
    localStorage: { getItem() { return null; }, setItem() {} },
    location: { href: "http://localhost/frontend/dictation_practice.html", search: "" },
    setTimeout,
    SpeechSynthesisUtterance,
    window: { SpeechSynthesisUtterance, speechSynthesis },
  });
  vm.runInContext(pageScript, context);
  vm.runInContext(`sentences=[${JSON.stringify({ full: sentence, cn: "" })}];renderSentences()`, context);
  const card = container.children[0];
  return {
    context,
    utterances,
    speechSynthesis,
    tokens: card.querySelectorAll(".word-token"),
    buttons: descendants(card).filter((element) => element.tagName === "BUTTON"),
  };
}

function playButton(harness) {
  return harness.buttons.find((button) => button.dataset.state === "stopped");
}

function stopButton(harness) {
  return harness.buttons.find((button) => button.textContent === "Stop");
}

test("Fast and Learning send isolated A and I without uppercase metadata", () => {
  for (const mode of ["fast", "learning"]) {
    for (const [sentence, expected] of [
      ["A few days later, Dylan called me.", "a"],
      ["I didn't mean to hurt your feelings.", "i"],
    ]) {
      const harness = createHarness(sentence);
      vm.runInContext(`currentMode='${mode}'`, harness.context);
      playButton(harness).onclick();
      assert.equal(harness.utterances[0].text, expected);
    }
  }
});

test("clicked A and I use speech-only normalization without changing display or indexes", () => {
  const harness = createHarness("A few I.");
  assert.deepEqual(harness.tokens.map((token) => token.textContent), ["A", "few", "I", "."]);

  harness.tokens[0].onclick();
  assert.equal(harness.utterances.at(-1).text, "a");
  harness.tokens[2].onclick();
  assert.equal(harness.utterances.at(-1).text, "i");
  assert.equal(vm.runInContext("playbackPositions[0]", harness.context), 2);
  assert.equal(vm.runInContext("currentTokenIndex", harness.context), 2);
  assert.deepEqual(harness.tokens.map((token) => token.textContent), ["A", "few", "I", "."]);
});

test("ordinary words, abbreviations, and punctuation keep their intended speech input", () => {
  const harness = createHarness("NASA waits.");
  for (const token of harness.tokens) token.onclick();
  assert.deepEqual(harness.utterances.map((utterance) => utterance.text), ["NASA", "waits", "full stop"]);
});

test("Natural mode sends the complete expected sentence unchanged", () => {
  const sentence = "A few days later, Dylan called me.";
  const harness = createHarness(sentence);
  vm.runInContext("currentMode='natural'", harness.context);
  playButton(harness).onclick();
  assert.equal(harness.utterances[0].text, sentence);
});

test("token playback pauses at the next token, resumes there, and Stop resets", () => {
  const harness = createHarness("A few days.");
  vm.runInContext("currentMode='learning'", harness.context);
  const play = playButton(harness);
  play.onclick();
  assert.equal(harness.utterances[0].text, "a");

  play.onclick();
  harness.utterances[0].onend();
  assert.equal(play.dataset.state, "stopped");
  assert.equal(vm.runInContext("playbackPositions[0]", harness.context), 1);

  play.onclick();
  assert.equal(harness.utterances[1].text, "few");
  stopButton(harness).onclick();
  assert.equal(vm.runInContext("playbackPositions[0]", harness.context), 0);
  assert.equal(play.dataset.state, "stopped");
  assert.ok(harness.speechSynthesis.cancelCount > 0);
});
