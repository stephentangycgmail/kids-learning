# English Grammar Practice

English Grammar Practice is a fully static, offline-capable learning module for short and long answers, sentence rearrangement, and mixed practice. The live site fetches committed JSON files only. It does not call an API or generate questions at runtime.

## Student Pages

- `frontend/grammar_practice.html`: setup, active practice, autosave, navigation, and submission
- `frontend/grammar_practice_result.html`: locked result and answer review
- `frontend/grammar_practice_history.html`: browser-local practice history for students and parents

All paths are relative so the pages work under the GitHub Pages repository subpath.

## Question Banks

- `frontend/data/grammar_practice_manifest.json`: bank filenames, session sizes, and topic definitions
- `frontend/data/grammar_practice_short_long.json`: Short & Long Answer questions
- `frontend/data/grammar_practice_rearrangement.json`: Sentence Rearrangement questions

The checked-in banks use schema version `1.0.0`. Short & Long questions contain four scored sections, explicit pronoun metadata, answer templates, blank choices, completed answers, and explanations. Rearrangement questions contain stable token instance IDs, the correct sentence, and a sentence-pattern hint.

Question data is treated as reviewed content. Do not hand-edit generated banks. Change the curated generator pools or templates, regenerate, validate, and review the resulting diff.

## Generation And Validation

The stable default seed is `20260716`.

```text
python tools/generate_grammar_practice_questions.py --seed 20260716
python tools/validate_grammar_practice_questions.py
```

The generator uses only the Python standard library and automatically runs the validator. The validator checks schema fields, IDs, categories, difficulty, answer options, pronoun metadata, four-section rendering, base verbs after negative auxiliaries, token reconstruction, punctuation, duplicates, and minimum counts.

## Browser Storage

Practice records use IndexedDB database `kidsLearningGrammarPractice`, version 1. The `sessions` object store keeps the selected question IDs, complete question snapshots, answers, timestamps, state, and submitted review. A localStorage fallback uses key `kidsLearning.grammarPractice.sessions.v1` when IndexedDB is unavailable.

Only one unfinished session is supported. Submitted and abandoned records are read-only. Records stay on the browser and device where the practice was completed; there is no account sync or cloud backup.

For controlled testing, clear the site data with browser developer tools. Clearing IndexedDB and localStorage permanently removes local practice history, so do this only on test data.

## Automated Tests

```text
node --test tests/grammar_practice.test.js
python -m unittest tests/test_grammar_practice_questions.py
```

The tests cover question selection, 10+10 mixed sessions, recent-question exclusion, timestamps, autosave and restoration, record locking, scoring, unanswered questions, duration, token identity and removal, snapshot stability, history order, and static JSON paths.

Use [grammar-practice-manual-test.md](grammar-practice-manual-test.md) for device and GitHub Pages verification.
