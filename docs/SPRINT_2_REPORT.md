# Sprint 2 Report

## Status

Sprint 2 has started with the first safe functional change: AI Teacher is disabled while API usage is paused.

## Completed

- Updated `frontend/eng.html` to mark AI Teacher as temporarily disabled.
- Updated `frontend/ai_teacher.html` to show a maintenance notice and return to the English menu.
- Updated `frontend/js/ai_teacher.js` to stop API calls while disabled.

## Preserved

- Existing UI layout is preserved.
- AI Teacher files are preserved.
- Backend API code is preserved for future review.
- Grammar and Dictation pages were not changed.
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

## Next Sprint 2 Tasks

1. Review `/static/...` links and backend-style paths.
2. Convert safe links to relative GitHub Pages compatible paths.
3. Avoid changing page layout.
4. Keep API-dependent functionality disabled until redesigned.
