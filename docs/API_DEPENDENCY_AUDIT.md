# API Dependency Audit

Sprint 1 audit of live API/backend dependency, updated after the static GitHub Pages migration. Student-facing pages now use static JSON files and browser speech only; backend files remain for legacy/local tooling.

## Summary

The project has two categories of features:

1. Static-friendly features that mainly use local JSON and browser TTS.
2. Legacy/local-only backend endpoints and helpers that must not be required during student use.

Static-friendly features are preserved. API-dependent student-facing features are disabled or converted to local JSON lookup.

## Backend Endpoints Found

From `backend/kids_ai_teacher.py`:

| Endpoint | Purpose | Future direction |
|---|---|---|
| `/static` | Serve frontend files in FastAPI mode | Not needed on GitHub Pages, but can remain for local backend mode. |
| `/list-dictation-files` | Return available dictation JSON files | Backend-only legacy path. Student pages use fixed static file lists. |
| `/api/sentences` | Serve sentence data | Prefer static JSON under `frontend/data/`. |
| `/api/health` | Health check | Backend-only. Not needed for static hosting. |
| `/api/debug_config` | Config debug | Should not be exposed publicly. Backend-only. |
| `/api/ask` | Generic AI answer | Backend-only legacy path. Disabled on GitHub Pages. |
| `/api/chat_teacher` | AI Teacher chat | Backend-only legacy path. AI Teacher page shows a maintenance message. |
| `/api/translate_sentence` | API translation | Replace with prewritten JSON where possible. |
| `/api/tts` | API TTS audio | Backend-only legacy path. Student pages use browser SpeechSynthesis. |
| `/api/tts_sync` | API TTS with timestamp sync | Backend-only legacy path. Student pages use browser SpeechSynthesis. |

## Frontend API Usage Found

| Frontend file | Dependency | Risk / note |
|---|---|---|
| `frontend/js/common_api.js` | Static JSON helper plus disabled AI/TTS placeholders | Does not build backend URLs on GitHub Pages. |
| `frontend/js/ai_teacher.js` | Maintenance-only behavior | Does not call backend APIs while disabled. |
| `frontend/js/vocab.js` | Static JSON lookup | Reads `vocab.json` / `vocab_ai.json`; does not call backend APIs. |
| `frontend/dictation_practice.html` | Static dictation file list and static vocabulary hints | Uses `data/...` paths and browser SpeechSynthesis. |
| `frontend/cn_dictation.html` | Static Chinese dictation file list | Uses `data/...` paths and browser SpeechSynthesis. |
| `frontend/index.html` | Relative page links | Works on GitHub Pages through root redirect. |

## Static-Friendly Areas

| Area | Static viability | Notes |
|---|---|---|
| Grammar | High | Reads `frontend/data/tenses_*.json` and uses browser TTS. |
| English Dictation | High | Uses static JSON and browser TTS. |
| Chinese Dictation | High | Uses static JSON and browser TTS. |
| Homepage | High | HTML/CSS only, but links need static path review. |
| English/Chinese menus | High | Static menu pages. |

## API-Dependent Areas

| Area | Dependency | Immediate action |
|---|---|---|
| AI Teacher | `/api/chat_teacher` or old `callTeacherAPI` | Disable link/page, keep files. |
| Vocabulary ask button | Static JSON only | Shows local explanation from reviewed JSON data. |
| Azure content generation scripts | Azure API keys/config | Keep local only. Move future content generation to reviewed JSON. |

## Static Migration Status

1. AI Teacher entry point is marked temporarily unavailable.
2. `ai_teacher.html`, `js/ai_teacher.js`, and backend code are preserved.
3. Student-facing pages avoid backend URLs during normal use.
4. Static page links and JSON fetches use relative paths.
5. Existing UI layout and JSON schemas are preserved.

## Static Path Migration Notes

Legacy backend mode may still contain URLs like:

```text
/static/data/xxx.json
/list-dictation-files
/api/...
```

GitHub Pages runtime uses:

```text
data/xxx.json
frontend/data/xxx.json
relative page links such as eng.html, cn.html
```

Any future backend work should stay local-only unless a reviewed static-hosting plan is added.
