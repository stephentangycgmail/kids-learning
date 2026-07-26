# Bug Tracker

## BUG-001

**Title:** Dictation playback does not resume from the selected or paused word

**Status:** Fixed (Pending Verification)

This status remains intentionally open until the unchecked regression steps
below are verified. Documentation synchronization does not claim that
verification occurred.

**Branch:** `feature/v2-dictation-practice`

**Fixed Commit:** `affd7dd4242e2427f0cec823e80d1e8b40334c3c`

**Regression Test:**

- [ ] Clicking a word and then Play resumes from that word.
- [ ] Pausing and then pressing Play resumes from the highlighted word.
- [ ] Stopping and then pressing Play starts from the beginning.
- [ ] Natural sentence completion resets playback to the beginning.
- [ ] Resume behavior works in natural, fast, and learning modes.

**Notes:** The initial resume and Speech API fallback implementation was added in commit `b7d9fd3a1617232aa0e690641f7645f77145d797`. Resume-state handling was corrected in the fixed commit above.

## BUG-002

**Title:** Vocabulary and AI Teacher reference a missing stylesheet

**Status:** Open (Deferred to implementation bug-fix task)

**Affected files:**

- `frontend/vocab.html`
- `frontend/ai_teacher.html`

**Observed behavior:**

Both pages reference `css/styles.css`, but the tracked stylesheet is
`frontend/css/tyles.css`.

**Documentation decision:**

Do not hide the mismatch or modify runtime files in documentation-only work.

## BUG-003

**Title:** Dockerfile references a missing backend application module

**Status:** Decision Pending

**Observed behavior:**

The Dockerfile starts `kids_ai_teacher:app`, but
`backend/kids_ai_teacher.py` is not tracked.

**Documentation decision:**

Record the current situation without deciding whether Docker support is
retired or should be restored.
