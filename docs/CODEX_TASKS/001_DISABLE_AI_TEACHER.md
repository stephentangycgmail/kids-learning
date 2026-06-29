# Codex Task 001 - Disable AI Teacher Safely

## Goal

Temporarily disable AI Teacher because the project is moving away from live API usage. Preserve the existing website layout and all source files. Do not delete AI Teacher code.

## Scope

Codex may modify only the minimum required frontend files, likely:

```text
frontend/eng.html
frontend/ai_teacher.html
frontend/js/ai_teacher.js
```

Do not modify unrelated pages unless needed for a broken link caused by this task.

## Hard Rules

- Do not redesign the UI.
- Do not change existing page layout except the AI Teacher entry/status text.
- Do not change dictation, grammar, vocabulary, or JSON data.
- Do not delete `ai_teacher.html`.
- Do not delete `frontend/js/ai_teacher.js`.
- Do not delete backend API code.
- Do not add any API key or config file.
- Do not commit `backend/config.json`.

## Required Behavior

### English menu

On `frontend/eng.html`, the AI Teacher option should remain visible but clearly show that it is temporarily unavailable.

Acceptable text examples:

```text
AI Teacher (Temporarily Disabled)
```

or

```text
AI Teacher - Under Maintenance
```

The visual style should remain consistent with the current menu.

### AI Teacher page

If the user opens `frontend/ai_teacher.html` directly, the page should not call the backend API.

It should show a simple message such as:

```text
AI Teacher is temporarily unavailable while the content generation system is being redesigned.
```

It should include a link back to the English menu.

### JavaScript

Prevent `frontend/js/ai_teacher.js` from calling the old API while disabled.

The safest option is to add a disable flag at the top:

```javascript
const AI_TEACHER_DISABLED = true;
```

When disabled, the send button should not submit to API and should display the maintenance message.

## Validation

After changes:

1. Open GitHub Pages homepage.
2. Open English menu.
3. Confirm AI Teacher is visibly marked disabled/maintenance.
4. Open AI Teacher page directly.
5. Confirm no API call is made.
6. Confirm no console error from missing `callTeacherAPI`.
7. Confirm Dictation still opens.
8. Confirm Grammar still opens.
9. Confirm existing layout is not redesigned.

## Commit Message

```text
Disable AI Teacher while API is paused
```

## Notes

This is a temporary disable, not a removal. AI Teacher may be redesigned later as an offline/static JSON-based helper.
