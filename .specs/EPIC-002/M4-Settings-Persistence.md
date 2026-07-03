# EPIC-002-M4 Dictation Settings Persistence

## Objective

Persist Dictation Practice settings in `localStorage` so the student's preferred reading mode, speech speed, and token pause are restored when reopening the page.

## Scope

Updated:

- `frontend/dictation_practice.html`

Created:

- `.specs/EPIC-002/M4-Settings-Persistence.md`

## Storage Keys

```text
kidsLearning.dictation.readMode
kidsLearning.dictation.speechRate
kidsLearning.dictation.wordPauseMs
```

## Persisted Settings

- read mode: `natural`, `fast`, or `learning`
- speech rate
- word pause in milliseconds

## Requirements

1. Restore saved settings on page load when values are valid.
2. Keep existing defaults when saved values are missing or invalid.
3. Save immediately when the student changes reading mode.
4. Save immediately when the student changes the speed slider.
5. Save immediately when the student changes the pause slider.
6. Clamp speech rate to the current speed slider min/max.
7. Clamp word pause to the current pause slider min/max.
8. Preserve catalog loading, dictation selector, playback, highlight, vocabulary popup, show/hide controls, speed, pause, and reading mode behavior.

## Out of Scope

- No broad JavaScript refactor.
- No new JavaScript files.
- No catalog JSON changes.
- No dictation JSON changes.
- No `vocab_ai.json` changes.
- No backend changes.

## Validation

- Open Dictation Practice.
- Change mode to `learning`.
- Change speed and pause.
- Reload the page.
- Confirm mode, speed, and pause are restored.
- Confirm dictation catalog and playback still work.
