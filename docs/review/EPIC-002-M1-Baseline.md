# EPIC-002-M1 Dictation Practice Baseline Review

## Overview

Dictation Practice is the English sentence dictation module reached from the English menu. Its purpose is to let a student select a dictation set, hide or reveal sentences, listen to sentence audio through the browser Web Speech API, click individual words for pronunciation, and view vocabulary hints from static JSON.

The current architecture is a static GitHub Pages friendly page:

- `frontend/dictation_practice.html` contains the page markup, inline styles, and all Dictation Practice runtime JavaScript.
- Dictation content is loaded with `fetch()` from `frontend/data/dictation01.json` and `frontend/data/dictation02.json`.
- Vocabulary hint content is loaded with `fetch()` from `frontend/data/vocab_ai.json`.
- Audio is generated at runtime with `SpeechSynthesisUtterance`; no backend TTS endpoint is used.
- Bootstrap CSS and JavaScript are loaded from CDN for base styling and components.

## Files

### `frontend/dictation_practice.html`

Primary Dictation Practice implementation.

Responsibilities:

- Defines the Dictation Practice page layout.
- Defines all page-specific CSS inline in the document.
- Defines dictation file list through `DICTATION_FILES`.
- Loads vocabulary hints from `data/vocab_ai.json`.
- Loads selected dictation data from `data/<file>`.
- Renders sentence cards, hidden sentence text, Chinese support text, and per-sentence controls.
- Handles reading modes, speed, pause between tokens, word highlighting, word click pronunciation, and vocabulary popups.

### `frontend/data/dictation01.json`

Static English dictation data.

Shape:

```json
{
  "sentences": [
    {
      "full": "Cola is bad for your health.",
      "cn": "..."
    }
  ]
}
```

Responsibility:

- Provides the first selectable English dictation set.
- Each sentence item supplies English text through `full` and Chinese support text through `cn`.

### `frontend/data/dictation02.json`

Static English dictation data.

Responsibility:

- Provides the second selectable English dictation set.
- Uses the same schema as `dictation01.json`.

### `frontend/data/vocab_ai.json`

Static vocabulary hint data.

Shape:

```json
{
  "word": {
    "cn": "...",
    "usage": "...",
    "tenses": "..."
  }
}
```

Responsibility:

- Provides popup content for clicked or hovered word tokens.
- Keys are matched through the page's `cleanKey()` normalization.

### `frontend/eng.html`

English menu page.

Responsibility:

- Links to `dictation_practice.html`.
- Provides the student entry point for Dictation Practice from the English learning menu.

### `frontend/service-worker.js`

Cleanup service worker.

Responsibility:

- Unregisters itself and has no fetch handler.
- Does not cache or intercept Dictation Practice requests.

### `frontend/js/common_api.js`

Shared static/API helper used by other pages, not by `dictation_practice.html`.

Responsibility in relation to Dictation Practice:

- No active runtime dependency.
- Confirms the project has a static JSON helper pattern, but Dictation Practice currently uses direct `fetch()` calls instead.

### `frontend/css/tyles.css`

Shared stylesheet used by some other pages, not by `dictation_practice.html`.

Responsibility in relation to Dictation Practice:

- No active runtime dependency.
- Dictation Practice uses inline CSS and Bootstrap CDN instead.

### `frontend/tts/*.wav`

Existing static audio assets.

Responsibility in relation to Dictation Practice:

- No active runtime dependency.
- Dictation Practice uses browser SpeechSynthesis, not stored WAV files.

## Runtime Flow

### Page Loading

1. Browser opens `frontend/dictation_practice.html`.
2. Bootstrap CSS loads from CDN.
3. The page renders header, dictation selector, reading controls, sliders, loading placeholder, and vocabulary popup container.
4. Bootstrap JavaScript loads from CDN.
5. On `DOMContentLoaded`, the page:
   - initializes browser voices with `initVoices()`;
   - starts loading vocabulary hints with `loadVocabAI()`;
   - wires speed and pause sliders;
   - sets the reading mode to `natural`;
   - initializes the dictation selector with `initDictationSelector()`.

### JSON Loading

1. `DICTATION_FILES` is hard-coded as `["dictation01.json","dictation02.json"]`.
2. `initDictationSelector()` creates one `<option>` per file.
3. Initial page load calls `loadDictation(DICTATION_FILES[0])`.
4. `loadDictation(file)` fetches `data/` plus the encoded filename.
5. The response is parsed as JSON.
6. If `data.sentences` is an array, it becomes the active `sentences` list.
7. `renderSentences()` rebuilds the sentence cards.
8. If loading fails, the page shows a simple failure message in the sentence container.

Vocabulary hints load separately:

1. `loadVocabAI()` fetches `data/vocab_ai.json`.
2. If successful, the parsed object is assigned to `vocabAI`.
3. If loading fails, `vocabAI` stays as an empty object and popups are unavailable.

### Audio Playback

Dictation Practice uses browser SpeechSynthesis only.

Natural mode:

1. Student clicks a sentence Play button.
2. The page calls `stopEverything()` to cancel existing playback.
3. The clicked button changes to `Pause`.
4. `speakText(item.full, speechRate, stopEverything)` creates a `SpeechSynthesisUtterance`.
5. The utterance uses `en-US`, the selected speech rate, and the first available English voice when available.
6. Browser speech starts with `speechSynthesis.speak()`.
7. On end or error, `stopEverything()` resets playback state.

Fast and Learning modes:

1. Student clicks Play.
2. The sentence is tokenized with `splitIntoTokens()`.
3. `playTokens(tokens, 0, playButton)` speaks one token at a time.
4. The active token receives `.word-token.active`.
5. After each utterance ends, a timer waits `wordPauseMs`, then the next token plays.
6. End of token list calls `stopEverything()`.

Word click pronunciation:

1. Student clicks an individual word token.
2. Existing playback is stopped.
3. The clicked token is highlighted.
4. The token, or punctuation description from `punctuationMap`, is spoken through `speakText()`.

### Highlight

Highlighting is DOM class based:

- Hidden sentence text uses `.sentence-hidden`, implemented with CSS blur and `user-select: none`.
- Active word playback uses `.word-token.active`.
- `playTokens()` clears previous active tokens before highlighting the current token.
- `stopEverything()` clears all active word highlights.
- Word hover uses `.word-token:hover` styling.

### Settings

Reading modes:

- `natural`: `speechRate = 1`, `wordPauseMs = 0`.
- `fast`: `speechRate = 1.2`, `wordPauseMs = 80`.
- `learning`: `speechRate = 0.8`, `wordPauseMs = 250`.

Sliders:

- `speedSlider` changes `speechRate`.
- `pauseSlider` changes `wordPauseMs`.
- Both update visible value labels immediately.

Visibility controls:

- Show All removes `.sentence-hidden` from every sentence body.
- Hide All adds `.sentence-hidden` to every sentence body.
- Each sentence card has its own show/hide toggle.

Dictation selector:

- Changing the selector calls `loadDictation()` for the selected static JSON file.
- Existing playback is stopped before new data renders.

### Event Flow

Page-level events:

- `DOMContentLoaded` initializes voices, data loading, controls, and selector.
- A capture-phase document click hides the vocabulary popup when clicking outside a word token or the popup.

Inline HTML events:

- Show All and Hide All buttons call global functions.
- Reading mode buttons call `setReadMode()`.

Generated DOM events:

- Selector `change` loads selected dictation JSON.
- Sentence toggle button hides or reveals sentence body.
- Sentence play button starts natural or token playback.
- Sentence stop button calls `stopEverything()`.
- Word token click plays that token and opens usage popup.
- Word token mouse enter opens usage popup.
- Word token mouse leave hides usage popup.

## Dependencies

External dependencies:

- Bootstrap CSS CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`
- Bootstrap JavaScript CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js`
- Browser Web Speech API: `speechSynthesis`, `SpeechSynthesisUtterance`
- Browser Fetch API

Static data dependencies:

- `frontend/data/dictation01.json`
- `frontend/data/dictation02.json`
- `frontend/data/vocab_ai.json`

Navigation dependency:

- `frontend/eng.html` links to Dictation Practice.

Shared local code:

- No local shared JavaScript is imported by `frontend/dictation_practice.html`.
- No local shared CSS is imported by `frontend/dictation_practice.html`.
- `frontend/service-worker.js` has no fetch handler and does not affect runtime loading.

## Strengths

- Static GitHub Pages compatible: all student-facing data comes from relative `data/...` paths.
- No backend API dependency for dictation content, vocabulary hints, or audio playback.
- Browser SpeechSynthesis keeps runtime cost low and avoids generated audio file management.
- The main learning flow is self-contained and easy to open directly.
- The dictation JSON schema is simple and stable.
- Playback state cleanup is centralized in `stopEverything()`.
- Token-by-token playback already supports highlight and adjustable pause.
- Vocabulary hint popup is data-driven from `vocab_ai.json`.

## Technical Debt

### P0

No P0 technical debt found in the current baseline review.

### P1

- The dictation file list is hard-coded in `DICTATION_FILES`. Adding a new dictation JSON file requires editing page code instead of updating an index or content manifest.
- The implementation is monolithic: markup, styling, state, data loading, rendering, speech playback, and event handling all live inside `frontend/dictation_practice.html`. This raises the risk of accidental regressions when the module grows.
- The code references `speechSynthesis` directly in several places instead of consistently checking `window.speechSynthesis`. Browsers without the Web Speech API could hit runtime errors instead of a controlled unsupported-state message.

### P2

- The Play button label changes to `Pause`, but clicking it while playing calls `stopEverything()` rather than pausing/resuming. The behavior is internally consistent with the code, but the label can mislead future maintainers and users.
- Vocabulary hint loading is asynchronous and not awaited before dictation rendering. Early word interactions can occur before `vocabAI` finishes loading, resulting in missing popups until the fetch completes.
- The tokenization regex is embedded inline and may not be robust for contractions, curly apostrophes, hyphenated words, or non-ASCII English text.
- Error handling is intentionally minimal. Failed dictation loads show a generic message, and failed vocabulary hint loads silently degrade to no hints.
- The page relies on browser-created global variables for element IDs such as `speedSlider`, `pauseSlider`, `speedValue`, and `pauseValue`. This works in many browsers but is less explicit than querying elements directly.
- Inline CSS and generated inline event handlers make automated unit testing difficult.

## Risks

- Changing the dictation JSON schema would break `loadDictation()` and `renderSentences()` unless the page is updated at the same time.
- Moving JavaScript out of the HTML could change global function availability for inline `onclick` handlers.
- Replacing direct `fetch()` paths could break GitHub Pages relative loading.
- Adding backend or API TTS would violate the current static runtime model unless explicitly planned.
- Changing tokenization can affect highlighting, word click pronunciation, and vocabulary lookup keys.
- Changing `stopEverything()` can affect sentence playback, token playback, word click speech, button labels, timers, and popup state at the same time.
- Browser SpeechSynthesis behavior varies by browser, platform, installed voices, and user gesture policies.
- Bootstrap CDN availability affects styling and any Bootstrap JavaScript behavior.

## Recommendations

- Keep the current static JSON and browser SpeechSynthesis model.
- Introduce a dictation index or manifest in a future milestone so new dictation files do not require editing page code.
- Before refactoring, add a small manual or automated smoke checklist for JSON loading, natural playback, token playback, word click speech, popup hints, and show/hide controls.
- When implementation work is approved, split page-specific JavaScript into a dedicated module only after preserving inline handler compatibility or replacing handlers deliberately.
- Use explicit DOM element lookups instead of relying on global variables created from element IDs.
- Add a clear unsupported-state path for browsers without Web Speech API support.
- Align the Play/Pause label with actual behavior, or implement true pause/resume in a dedicated behavior milestone.
- Keep `dictation01.json`, `dictation02.json`, and `vocab_ai.json` schemas stable until a documented migration exists.
