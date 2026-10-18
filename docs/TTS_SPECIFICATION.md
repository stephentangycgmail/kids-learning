# Text-to-Speech Behavior Specification

## Purpose

This document defines the standard browser text-to-speech behavior for the Kids Learning Platform. Implementations must follow these rules consistently wherever token-based speech playback is available.

## 1. Click Word

- Speak the clicked word immediately.
- Save the clicked word's token index as the resume position.
- A subsequent Play action must begin with the clicked word.

## 2. Play

- Start playback from the saved resume position.
- Use token `0` when no resume position has been saved.

## 3. Pause

- Allow the word currently being spoken to finish.
- Save the next unread word's token index as the resume position.
- A subsequent Play action must begin with that next word.

## 4. Stop

- Stop speech playback immediately.
- Cancel any pending playback or pause timer.
- Reset the resume position to token `0`.

## 5. Natural Completion

- Reset the resume position to token `0` after playback reaches the natural end of the content.
- A subsequent Play action must begin at the start.

## 6. Unsupported Speech API

- Detect whether the required browser Speech API is available before creating or controlling speech utterances.
- Show a consistent, clear message when speech is unavailable.
- Keep non-speech content and controls usable where applicable.
- Never throw JavaScript errors because the Speech API is missing or unavailable.

## 7. Dictation Token Speech Input

- Fast and Learning playback, and a clicked Dictation word, must use the same
  token-to-speech conversion.
- When the complete token is uppercase `A` or `I`, send lowercase `a` or `i`
  respectively to `SpeechSynthesisUtterance`. This avoids voices that announce
  the isolated uppercase token as “capital A” or “capital I”.
- Do not lowercase any other token. Ordinary words, abbreviations, punctuation
  names, and Natural mode sentence input retain their existing speech text.
- Speech-only conversion must not change displayed sentence text, token order or
  indexes, highlighting, saved playback position, or vocabulary lookup keys.
- Browser and operating-system voices vary. Automated tests must verify the
  utterance input, while supported-browser listening checks must separately
  confirm the actual pronunciation for the selected voice.

## 8. Dictation Mode Defaults

- Natural uses `1.0x` speed with no token pause.
- Fast uses `0.8x` speed with an 80 ms token pause.
- Learning uses `0.4x` speed with a 250 ms token pause.
- Selecting a mode applies its defaults. Reloading the page may restore a
  browser-saved manual speed or pause preference instead.
