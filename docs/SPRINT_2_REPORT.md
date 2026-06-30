# Sprint 2 Report

## Status

Sprint 2 includes the static GitHub Pages migration for student-facing pages while keeping the existing UI and JSON schemas intact.

## Completed

- Updated `frontend/eng.html` to mark AI Teacher as temporarily disabled.
- Updated `frontend/ai_teacher.html` to show a maintenance notice and return to the English menu.
- Updated `frontend/js/ai_teacher.js` to stop API calls while disabled.
- Updated English and Chinese dictation pages to use static `data/...` JSON paths and browser SpeechSynthesis.
- Updated Vocabulary to use local JSON lookup instead of an AI/API ask helper.
- Updated shared frontend helper code so API/TTS helpers are disabled on the static site.

## Preserved

- Existing UI layout is preserved.
- AI Teacher files are preserved.
- Backend API code is preserved for future review.
- Grammar and Dictation learning flow is preserved.
- JSON formats were not changed.
- No new教材 was added.

## Test Checklist

After GitHub Pages deploys, test:

1. Open homepage.
2. Open English menu.
3. Confirm AI Teacher shows `(Temporarily Disabled)`.
4. Open AI Teacher page.
5. Confirm it shows maintenance notice.
6. Confirm it does not call API.
7. Confirm Grammar still opens.
8. Confirm Dictation still opens.

## Remaining Notes

1. Backend files remain as legacy/local-only tooling.
2. Keep API-dependent functionality disabled until a reviewed static-hosting plan exists.
3. Test the GitHub Pages deployment after publishing.
