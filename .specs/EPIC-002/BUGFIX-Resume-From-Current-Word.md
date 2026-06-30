# EPIC-002 Bugfix - Resume From Current Word

## Objective

Restore Dictation Practice playback so a sentence resumes from the selected or stopped token.

## Behavior

- Clicking a token stores and highlights its sentence/token position before speaking it.
- Playing that sentence resumes from its stored token in natural, fast, and learning modes.
- Stopping playback preserves the active token position.
- Completing a sentence resets its position to the beginning.
- Loading another lesson clears all saved playback positions.
- Speech API fallback, catalog loading, settings persistence, vocabulary help, and show/hide controls remain unchanged.

## Validation

- Check inline JavaScript syntax.
- Validate repository JSON files.
- Check Markdown links.
- Confirm only the intended HTML and specification files changed.
