# Bug Tracker

## BUG-001

**Title:** Dictation playback does not resume from the selected or paused word

**Status:** Fixed (Pending Verification)

**Branch:** `feature/v2-dictation-practice`

**Fixed Commit:** `affd7dd4242e2427f0cec823e80d1e8b40334c3c`

**Regression Test:**

- [ ] Clicking a word and then Play resumes from that word.
- [ ] Pausing and then pressing Play resumes from the highlighted word.
- [ ] Stopping and then pressing Play starts from the beginning.
- [ ] Natural sentence completion resets playback to the beginning.
- [ ] Resume behavior works in natural, fast, and learning modes.

**Notes:** The initial resume and Speech API fallback implementation was added in commit `b7d9fd3a1617232aa0e690641f7645f77145d797`. Resume-state handling was corrected in the fixed commit above.
