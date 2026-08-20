# User Guide

Kids Learning is a static learning website for English, Chinese, and Math
practice. It runs in a web browser and does not require an account or production
backend.

## Open the Site

Production URL:

```text
https://stephentangycgmail.github.io/kids-learning/
```

Choose Chinese, English, or Math from the subject menu. Some areas are
placeholders or temporarily disabled and say so on screen.

## English Learning

### Vocabulary

Vocabulary uses reviewed local JSON data. Search or select a word to view the
available meaning and usage information.

### Dictation Practice

1. Select a dictation lesson.
2. Choose Natural, Fast, or Learning mode.
3. Adjust speech speed and word pause when needed.
4. Use Show All, Hide All, or the control on one sentence.
5. Select Play to hear a sentence.
6. Select a word to hear that word and view available vocabulary help.

Dictation preferences are stored in the browser. Browser speech availability
and voice quality vary by device and browser.

### Grammar Lessons

Grammar lessons are loaded from the committed lesson catalog. Select a Grammar
category first, then choose one of the lesson tabs shown for that category.
Review examples and practice, use a quiz when the lesson provides one, or
follow the Dictation link for the selected lesson. Previous and Next stay
within the selected category.

Lesson tabs wrap to additional rows on narrower screens. Question Words and
Quantifiers therefore remain reachable without pushing Quiz or Dictation
actions off-screen.

Question Words and Quantifiers include visual learning cards and an 8-question
guided mini-practice with immediate bilingual feedback. Quantifiers explains
Countable and Uncountable nouns and compares 18% and 85% water in the same glass.
Guided Practice is learning-only and does not create a Practice History record.

### English Grammar Practice

Grammar appears before Grammar Practice on the English menu. The Practice Mode
section provides:

- Short and Long Answer
- Sentence Rearrangement
- Mixed Practice

Each session contains 20 questions. Progress saves automatically in the
browser. Submitted and abandoned records appear in Practice History and are
read-only.

Practice history stays on the current browser and device. There is no account
sync or cloud backup. Clearing browser site data permanently removes local
practice history.

The separate Grammar Topic Quiz / Challenge section lets the learner select
Question Words or Quantifiers from the production manifest. It selects 10
unique questions and keeps answers, feedback, hints, and Chinese translations
hidden until completion. A selected answer receives a neutral highlight and
may be changed before selecting Next. The Result page then shows score, percentage, the
correct answer, and a full bilingual explanation of each wrong answer.
Each Quiz review also shows the completed English sentence, its Chinese
translation, and the meaning of both the correct choice and an incorrect choice.
For Quantifiers, the review also explains the noun's countability and why the
chosen quantifier does or does not match the amount required by the sentence.
Completed topic quizzes use the same Practice History and Result pages as the
normal 20-question modes.

### Placeholder and Disabled Areas

- Sentences, Usage, Quiz, and Math may show Coming Soon.
- AI Teacher is temporarily disabled and does not call a production API.

## Chinese Learning

Chinese Dictation loads committed Chinese sentence files and uses browser
speech. Select a lesson and use the page controls for playback and practice.

## Browser Requirements

Use a current desktop or mobile browser with JavaScript enabled. Speech features
require the Web Speech API and an available system voice. Non-speech content
should remain usable when speech is unsupported where the page implements a
fallback.

The site loads some visual libraries from public CDNs. Initial page styling may
require network access even though learning content is committed in the
repository.

## Privacy and Local Data

- No login is required.
- Grammar Practice records are stored in IndexedDB, with localStorage fallback.
- Dictation preferences use localStorage.
- Data does not automatically move between devices.
- Clearing site data removes stored history and preferences.

For controlled testing, clear site data only when the stored records are
disposable.

## Troubleshooting

- **No speech:** confirm browser speech support, device volume, and installed
  voices.
- **Lesson does not load:** refresh and confirm the static JSON request
  succeeded.
- **Practice history missing:** confirm the same browser/device is being used
  and site data was not cleared.
- **Unexpected styling:** refresh the page and confirm static CSS requests
  succeed under the repository subpath.

Technical validation instructions are in
[`TESTING_GUIDE.md`](TESTING_GUIDE.md).
