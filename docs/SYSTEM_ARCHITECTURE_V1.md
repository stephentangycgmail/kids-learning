# System Architecture v1.0

Sprint 1 purpose: document the existing system before any functional change. The current website layout and working behavior must be preserved.

## Current Hosting

- Public test site: GitHub Pages.
- Repository: `stephentangycgmail/kids-learning`.
- Root `index.html` redirects to `frontend/index.html` for GitHub Pages.
- Original app structure still keeps the website under `frontend/`.

## High-Level Structure

```text
kids-learning/
├── frontend/        # Student-facing static website
├── backend/         # Local/FastAPI tools and old API-based generation/runtime
├── deploy/          # Deployment package area
├── docs/            # Project documentation
├── Dockerfile
└── index.html       # GitHub Pages redirect to frontend/index.html
```

## Navigation Map

```text
frontend/index.html
├── cn.html
│   └── cn_dictation.html
└── eng.html
    ├── dictation_practice.html
    ├── grammar.html
    ├── ai_teacher.html   # to be disabled, not deleted
    ├── sentences.html    # referenced but not confirmed in current uploaded package
    ├── usage.html        # referenced but not confirmed in current uploaded package
    └── quiz.html         # placeholder
└── math.html             # placeholder
```

## Frontend Page Inventory

| File | Purpose | Main dependencies | Current status |
|---|---|---|---|
| `frontend/index.html` | Subject landing page | inline CSS/HTML | Works on GitHub Pages through root redirect and relative links. |
| `frontend/eng.html` | English menu page | Tailwind CDN | Active. Links to English modules and AI Teacher. |
| `frontend/cn.html` | Chinese menu page | Tailwind CDN | Active. Links to Chinese dictation. |
| `frontend/math.html` | Math placeholder page | Tailwind CDN | Coming Soon page to avoid broken navigation. |
| `frontend/dictation_practice.html` | English dictation practice | Bootstrap CDN, inline JS, `frontend/data/dictation*.json`, `vocab_ai.json` | Active. Uses static JSON and browser TTS. |
| `frontend/cn_dictation.html` | Chinese dictation practice | Bootstrap CDN, inline JS, `frontend/data/cn_dictation*.json` | Active. Uses static JSON and browser TTS. |
| `frontend/grammar.html` | Grammar / tenses practice | inline CSS/JS, `frontend/data/tenses_*.json` | Active. Uses browser TTS. |
| `frontend/vocab.html` | Vocabulary page | `js/common_api.js`, `js/vocab.js`, `css/styles.css` | Active. Uses static vocabulary JSON lookup. |
| `frontend/ai_teacher.html` | AI Teacher chat page | `js/common_api.js`, `js/ai_teacher.js`, `css/styles.css` | Disabled with a maintenance message while API is not used. Preserve files. |

## JavaScript Inventory

| File | Purpose | API dependency | Notes |
|---|---|---|---|
| `frontend/js/common_api.js` | Static JSON helper plus disabled AI/TTS placeholders | No active backend dependency | Safe for GitHub Pages runtime. |
| `frontend/js/ai_teacher.js` | AI Teacher disabled behavior | No active backend dependency | Shows a maintenance message and disables input. |
| `frontend/js/vocab.js` | Vocabulary interaction | No active backend dependency | Loads `vocab.json` and `vocab_ai.json`. |
| `frontend/js/grammar.js` | Placeholder/empty in uploaded package | No known dependency | Grammar logic is currently inline in `grammar.html`. |
| `frontend/js/quiz.js` | Placeholder/empty in uploaded package | No known dependency | Referenced future/old module. |
| `frontend/js/usage.js` | Placeholder/empty in uploaded package | No known dependency | Referenced future/old module. |

## Data File Inventory

| File | Shape | Used by |
|---|---|---|
| `frontend/data/dictation01.json` | object with `sentences[]`, each item has `full`, `cn` | English dictation |
| `frontend/data/dictation02.json` | object with `sentences[]`, each item has `full`, `cn` | English dictation |
| `frontend/data/sentences.json` | object with `sentences[]`, each item has `full`, `cn` | Sentence/legacy support |
| `frontend/data/vocab_ai.json` | object keyed by lowercase word; values include `cn`, `usage`, `tenses` | Dictation word hint popup |
| `frontend/data/vocab.json` | object keyed by word | Vocabulary legacy/demo data |
| `frontend/data/cn_dictation01.json` | object with `sentences[]`, each item has `text` | Chinese dictation |
| `frontend/data/cn_dictation02.json` | object with `sentences[]`, each item has `text` | Chinese dictation |
| `frontend/data/tenses_present_simple.json` | array of examples with `english`, `chinese`, `reason_cn`, `time_keywords` | Grammar |
| `frontend/data/tenses_present_continuous.json` | array of examples with `english`, `chinese`, `reason_cn`, `time_keywords` | Grammar |
| `frontend/data/tenses_past_simple.json` | array of examples with `english`, `chinese`, `reason_cn`, `time_keywords` | Grammar |

## Speech / Audio

Current main speech mechanism is browser Web Speech API:

```text
SpeechSynthesisUtterance
window.speechSynthesis.speak(...)
```

Only two small WAV files exist under `frontend/tts/`; they are not the main pronunciation mechanism.

## Backend Inventory

| File | Purpose | Status |
|---|---|---|
| `backend/kids_ai_teacher.py` | FastAPI app, static file serving, AI teacher, TTS, dictation file list | Keep for now. API-dependent parts planned for removal or local-only use. |
| `backend/build_sentences_and_vocab_ai_azure.py` | Azure/API content generation | Legacy/API-dependent. Do not run without local config. |
| `backend/build_tenses_examples_azure.py` | Azure/API grammar example generation | Legacy/API-dependent. Do not run without local config. |
| `backend/config.json` | Real local secrets/config | Must never be committed. |
| `backend/config.example.json` | Safe template | Committed. |
| `backend/output/*.json` | Generated output | Keep if useful, but prefer reviewed final JSON under `frontend/data/`. |

## Do Not Change During Sprint 1

- Do not redesign UI.
- Do not change layout.
- Do not change JSON schema.
- Do not delete AI Teacher code.
- Do not remove backend files yet.
- Do not add new教材.
- Do not add live API calls.

## Immediate Findings

1. GitHub Pages can load the homepage.
2. Student-facing frontend links and JSON fetches use GitHub Pages compatible relative paths.
3. AI Teacher is disabled and Vocabulary uses static JSON lookup.
4. Dictation and Grammar mainly use static JSON and browser TTS, making them good candidates for static hosting.
5. The project should gradually move from API-generated content to reviewed JSON committed under `frontend/data/`.
