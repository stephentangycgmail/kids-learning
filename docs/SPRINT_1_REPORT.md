# Sprint 1 Report

## Status

Sprint 1 analysis documents have been created. No existing website feature or layout was intentionally changed.

## Completed

- Created `docs/SYSTEM_ARCHITECTURE_V1.md`.
- Created `docs/API_DEPENDENCY_AUDIT.md`.
- Created `docs/CODEX_TASKS/001_DISABLE_AI_TEACHER.md`.
- Confirmed current direction: keep existing UI and functions, disable API-dependent AI Teacher before public use.

## Key Findings

1. GitHub Pages can load the homepage.
2. `frontend/` is the main student-facing website.
3. Grammar is mostly static and uses local JSON plus browser TTS.
4. Dictation pages are mostly static and use browser TTS, but still contain backend-style paths such as `/static/data/...` and `/list-dictation-files`.
5. AI Teacher and old Vocabulary ask functions depend on backend/API and should be disabled or redesigned.
6. Real API config must remain local only through `backend/config.json`.
7. Future教材 generation should be reviewed JSON committed into `frontend/data/`.

## Do Not Change Rules Confirmed

- Do not redesign existing pages.
- Do not change current layout.
- Do not change JSON schema.
- Do not delete AI Teacher code.
- Do not add new教材 during cleanup.
- Do not commit API keys.

## Recommended Next Step

Run Codex Task 001:

```text
docs/CODEX_TASKS/001_DISABLE_AI_TEACHER.md
```

This will disable AI Teacher safely while keeping the current page and code for future redesign.

## After Codex Task 001

Review:

- `frontend/eng.html`
- `frontend/ai_teacher.html`
- `frontend/js/ai_teacher.js`

Then test:

- Homepage
- English menu
- Dictation
- Grammar
- AI Teacher direct URL
