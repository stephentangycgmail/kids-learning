# EPIC-002-M5 Dictation Play Button Label Fix

## Objective

Make Dictation Practice playback button labels match the current behavior.

## Context

The active play button previously changed from `Play` to `Pause`, but clicking the active button stops playback. This milestone keeps the current stop behavior and changes only the active label.

## Scope

Updated:

- `frontend/dictation_practice.html`

Created:

- `.specs/EPIC-002/M5-Play-Button-Label-Fix.md`

## Requirements

1. Do not implement true pause/resume.
2. When playback is active, the generated sentence play button should show `Stop`.
3. Clicking the active button should keep the existing stop behavior.
4. The button must reset to `Play` after playback ends or is stopped.
5. Preserve natural playback, fast playback, learning playback, word highlighting, word click pronunciation, vocabulary popup, settings persistence, and catalog loading.

## Out of Scope

- No speech logic refactor.
- No true pause/resume behavior.
- No new JavaScript files.
- No catalog JSON changes.
- No dictation JSON changes.
- No `vocab_ai.json` changes.
- No backend changes.

## Validation

- Open Dictation Practice.
- Click Play in natural, fast, and learning modes.
- Confirm active button shows `Stop`, not `Pause`.
- Confirm clicking the active button stops playback and resets to `Play`.
- Confirm explicit Stop button still resets playback.
