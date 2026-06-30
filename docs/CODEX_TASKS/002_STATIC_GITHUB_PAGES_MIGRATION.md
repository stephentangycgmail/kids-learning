# Codex Task 002 - Static GitHub Pages Migration

## Goal

Make the existing Kids Learning website work as a static GitHub Pages website without requiring FastAPI, Azure OpenAI, Azure Speech, or any backend API during student use.

The existing UI, layout, learning flow, and JSON schemas must be preserved.

## Current Public Test URL

```text
https://stephentangycgmail.github.io/kids-learning/
```

## Scope

Codex should scan and update the whole repository, especially:

```text
frontend/*.html
frontend/js/*.js
frontend/data/*.json
frontend/service-worker.js
index.html
README.md
docs/*.md
```

Backend files should generally remain untouched unless documenting that they are legacy/local-only.

## Hard Rules

- Do not redesign the UI.
- Do not change existing layout.
- Do not change JSON schema.
- Do not add new learning materials.
- Do not delete backend files.
- Do not delete AI Teacher files.
- Do not re-enable AI Teacher API calls.
- Do not add API keys, tokens, secrets, or `backend/config.json`.
- Do not introduce any paid API dependency.
- Keep all changes small and reviewable.

## Required Migration

### 1. Remove FastAPI static paths from frontend runtime

Find and replace all frontend runtime references like:

```text
/static/...
```

with GitHub Pages compatible relative paths.

Examples:

```text
/static/eng.html        -> frontend relative link or eng.html depending current file
/static/data/file.json  -> data/file.json
/static/css/styles.css  -> css/styles.css
/static/js/file.js      -> js/file.js
```

Important: choose paths relative to each HTML file location.

### 2. Remove backend API calls during student use

Find and remove or disable calls to:

```text
/api/...
/list-dictation-files
/api/tts
/api/tts_sync
/api/chat_teacher
/api/ask
/api/translate_sentence
```

For static student pages, use one of these approaches:

- Use `frontend/data/*.json` directly.
- Use a small local fixed file list if directory scanning is impossible on GitHub Pages.
- Show a safe maintenance message for disabled API-only features.

### 3. Dictation page

`frontend/dictation_practice.html` must:

- Load dictation JSON from `data/dictation01.json`, `data/dictation02.json`, etc.
- Load vocabulary hints from `data/vocab_ai.json`.
- Use browser SpeechSynthesis only.
- Not call `/list-dictation-files`.
- Not call `/static/data/...`.
- Not call `/api/tts` or `/api/tts_sync`.
- Preserve current buttons and learning flow as much as possible.

### 4. Chinese Dictation page

`frontend/cn_dictation.html` must:

- Load Chinese dictation JSON from `data/cn_dictation01.json`, `data/cn_dictation02.json`, etc.
- Use browser SpeechSynthesis only.
- Not call `/static/data/...`.
- Not call backend APIs.
- Preserve current UI and learning behavior.

### 5. Grammar page

`frontend/grammar.html` must:

- Continue loading static JSON from `data/tenses_*.json`.
- Use browser SpeechSynthesis only.
- Not call backend APIs.
- Preserve current UI.

### 6. AI Teacher

AI Teacher must remain disabled.

- `frontend/eng.html` should show AI Teacher as temporarily disabled.
- `frontend/ai_teacher.html` should show maintenance/unavailable message.
- `frontend/js/ai_teacher.js` must not call APIs while disabled.
- Do not delete AI Teacher code.

### 7. Vocabulary

If `frontend/vocab.html` or `frontend/js/vocab.js` still depends on API calls:

- Disable API ask function safely, or
- Convert it to static JSON lookup using `data/vocab.json` or `data/vocab_ai.json`.

Do not redesign the page.

### 8. Missing pages / broken menu links

Every menu link should open a valid page.

If a module is not ready, create or keep a simple placeholder page with:

- Existing dark style if possible.
- Clear “Coming Soon” or “Temporarily Disabled” message.
- Back link to the English or subject menu.

Do not leave 404 links in the main navigation.

## Search Checklist

Before finishing, search the repository for these strings:

```text
/static/
/list-dictation-files
/api/
api/tts
api/tts_sync
api/chat_teacher
api/ask
callTeacherAPI
AZURE
OPENAI
```

Any remaining occurrence must be either:

- backend-only, or
- documentation, or
- intentionally disabled code with clear comments.

No active student-facing page should depend on them.

## Validation

After changes, test on GitHub Pages or local static server:

1. Homepage loads.
2. Chinese card opens `cn.html`.
3. English card opens `eng.html`.
4. English menu opens:
   - Vocabulary
   - Sentences placeholder
   - Dictation Practice
   - Grammar
   - Usage placeholder
   - Quiz placeholder
   - AI Teacher disabled page
5. Dictation Practice loads JSON and displays sentences.
6. Dictation Play works with SpeechSynthesis.
7. Word click pronunciation works with SpeechSynthesis.
8. Word hint popup loads from `vocab_ai.json`.
9. Chinese Dictation loads static JSON and works.
10. Grammar loads tense examples and speech works.
11. Browser console has no 404 for `/static/...`, `/api/...`, or `/list-dictation-files`.
12. No API keys or secrets are committed.

## Expected Output

- Code changes committed to a branch or main, depending chosen workflow.
- Short summary of changed files.
- Manual test result summary.
- Notes for any remaining backend-only legacy code.

## Commit Message

```text
Migrate frontend to static GitHub Pages runtime
```

## Notes

The goal is not to remove the backend immediately. The backend may remain as local-only tooling for future content generation or validation. The student-facing website should not require it.
