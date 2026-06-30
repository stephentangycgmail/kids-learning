# EPIC-002-M6 - Dictation Speech API Fallback

## Objective

Add a safe unsupported-state fallback for browsers without Web Speech API support.

## Scope

Modified files:

- `frontend/dictation_practice.html`
- `.specs/EPIC-002/M6-Speech-API-Fallback.md`

## Implementation Notes

- Detects support for both `window.speechSynthesis` and `window.SpeechSynthesisUtterance`.
- Shows an inline warning near Dictation Practice playback controls when speech playback is unsupported.
- Disables generated sentence Play buttons when speech playback is unsupported.
- Keeps sentence text, Chinese translations, show/hide controls, catalog loading, settings persistence, and vocabulary popup behavior available.
- Keeps supported-browser behavior unchanged.

## Validation

- Confirm normal browser playback still starts and stops.
- Confirm unsupported speech state does not crash page initialization.
- Confirm catalog loading, settings persistence, and vocabulary popup remain usable.
- Confirm only intended files changed.
