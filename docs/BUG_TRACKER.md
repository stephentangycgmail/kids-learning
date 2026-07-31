# Bug Tracker

## BUG-001

**Title:** Dictation playback does not resume from the selected or paused word

**Status:** Verified Resolved

Verified on 2026-07-31 in a browser with Speech API support. The visible
playback position, controls, and completion/reset behavior matched the fixed
runtime state machine.

**Branch:** `feature/v2-dictation-practice`

**Fixed Commit:** `affd7dd4242e2427f0cec823e80d1e8b40334c3c`

**Regression Test:**

- [x] Clicking a word and then Play resumes from that word.
- [x] Pausing and then pressing Play resumes from the current playback word.
- [x] Stopping and then pressing Play starts from the beginning.
- [x] Natural sentence completion resets playback to the beginning.
- [x] Resume behavior works in natural, fast, and learning modes.

**Notes:** The initial resume and Speech API fallback implementation was added in commit `b7d9fd3a1617232aa0e690641f7645f77145d797`. Resume-state handling was corrected in the fixed commit above.

## BUG-002

**Title:** Vocabulary and AI Teacher reference a missing stylesheet

**Status:** Verified Resolved

**Affected files:**

- `frontend/vocab.html`
- `frontend/ai_teacher.html`

**Observed behavior:**

Both pages referenced `css/styles.css`, while the tracked stylesheet was
mistyped as `frontend/css/tyles.css`.

**Resolution:**

The stylesheet was renamed to `frontend/css/styles.css` during `v1.1.0`
release preparation. Local asset validation and desktop/mobile browser checks
confirmed both pages load the stylesheet without horizontal overflow.

## BUG-003

**Title:** Dockerfile references a missing backend application module

**Status:** Retained Legacy (Unsupported)

**Observed behavior:**

The Dockerfile starts `kids_ai_teacher:app`, but
`backend/kids_ai_teacher.py` is not tracked.

**Decision:**

The Dockerfile remains tracked as a legacy artifact, but it is not a supported
build, run, or production path because its application module is absent.
GitHub Pages is the only official deployment. Restoring or removing Docker
requires a separate approved task.
