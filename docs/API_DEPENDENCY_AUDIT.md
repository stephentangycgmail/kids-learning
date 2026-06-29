# API Dependency Audit

Sprint 1 audit of live API/backend dependency. This document supports the plan to reduce Azure/OpenAI usage while keeping existing pages and layout unchanged.

## Summary

The project has two categories of features:

1. Static-friendly features that mainly use local JSON and browser TTS.
2. API-dependent features that call backend endpoints or old helper functions.

Static-friendly features should be preserved and tested first. API-dependent features should be disabled or converted later.

## Backend Endpoints Found

From `backend/kids_ai_teacher.py`:

| Endpoint | Purpose | Future direction |
|---|---|---|
| `/static` | Serve frontend files in FastAPI mode | Not needed on GitHub Pages, but can remain for local backend mode. |
| `/list-dictation-files` | Return available dictation JSON files | Replace with static file list or manual selector for GitHub Pages. |
| `/api/sentences` | Serve sentence data | Prefer static JSON under `frontend/data/`. |
| `/api/health` | Health check | Backend-only. Not needed for static hosting. |
| `/api/debug_config` | Config debug | Should not be exposed publicly. Backend-only. |
| `/api/ask` | Generic AI answer | Disable while not using API. |
| `/api/chat_teacher` | AI Teacher chat | Disable while not using API. |
| `/api/translate_sentence` | API translation | Replace with prewritten JSON where possible. |
| `/api/tts` | API TTS audio | Current pages mainly use browser TTS. Keep disabled unless needed. |
| `/api/tts_sync` | API TTS with timestamp sync | Keep disabled unless needed. |

## Frontend API Usage Found

| Frontend file | Dependency | Risk / note |
|---|---|---|
| `frontend/js/common_api.js` | Builds `/api/...` URLs | Shared helper. Keep but do not expand usage. |
| `frontend/js/ai_teacher.js` | Calls `callTeacherAPI(...)` | Old helper mismatch. Disable AI Teacher page. |
| `frontend/js/vocab.js` | Calls `callTeacherAPI(...)` | Needs future conversion to static `vocab_ai.json` or `vocab.json`. |
| `frontend/dictation_practice.html` | Fetches `/static/data/vocab_ai.json`, `/list-dictation-files`, `/static/data/<file>` | Works in FastAPI mode. Needs static-compatible path adjustment later. |
| `frontend/cn_dictation.html` | Uses `DATA_DIR = "/static/data"` | Works in FastAPI mode. Needs static-compatible path adjustment later. |
| `frontend/index.html` | Links to `/static/cn.html`, `/static/eng.html`, `/static/math.html` | Works in FastAPI mode. GitHub Pages may require relative links. |

## Static-Friendly Areas

| Area | Static viability | Notes |
|---|---|---|
| Grammar | High | Reads `frontend/data/tenses_*.json` and uses browser TTS. |
| English Dictation | Medium/High | Uses JSON and browser TTS, but has backend-style paths. |
| Chinese Dictation | Medium/High | Uses JSON and browser TTS, but has backend-style paths. |
| Homepage | High | HTML/CSS only, but links need static path review. |
| English/Chinese menus | High | Static menu pages. |

## API-Dependent Areas

| Area | Dependency | Immediate action |
|---|---|---|
| AI Teacher | `/api/chat_teacher` or old `callTeacherAPI` | Disable link/page, keep files. |
| Vocabulary ask button | old `callTeacherAPI` | Disable API ask or convert later to local JSON explanation. |
| Azure content generation scripts | Azure API keys/config | Keep local only. Move future content generation to reviewed JSON. |

## Recommended Phase 2 Actions

1. Disable AI Teacher entry point from English menu or mark it as temporarily unavailable.
2. Keep `ai_teacher.html`, `js/ai_teacher.js`, and backend code for future reference.
3. Do not expose API error messages to child users.
4. Convert `/static/...` links and fetch paths to static-compatible relative paths, but only after testing.
5. Avoid large UI redesign.

## Static Path Migration Notes

Current backend mode assumes URLs like:

```text
/static/data/xxx.json
/list-dictation-files
/api/...
```

GitHub Pages should prefer:

```text
data/xxx.json
frontend/data/xxx.json
relative page links such as eng.html, cn.html
```

Any path migration must be tested on GitHub Pages and must not change layout or content behavior.
