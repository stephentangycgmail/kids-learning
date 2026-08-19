# Testing Guide

This guide is the current validation entry point. Use only checks relevant to
the change, and report every skipped or unavailable check.

## Automated Tests

From the repository root:

```powershell
node --test tests/grammar_practice.test.js tests/static_site.test.js
node tests/grammar_preview_validation.js
python -m unittest tests/test_grammar_practice_questions.py
python tools/validate_grammar_practice_questions.py
```

The committed tests cover Grammar Practice selection, storage, scoring,
history, static paths, question-bank structure, and local page references.
They do not currently cover the UAT-only Grammar Preview page; manually test
its randomized question flow, immediate feedback, separate localStorage progress, responsive
layout, Quiz answer hiding, and JSON loading manually when it changes. The
Preview validation script checks its question-bank size, IDs, target coverage,
and Chinese explanations.

## JSON Validation

`.github/workflows/validate-json.yml` parses every repository JSON file on
relevant pull requests and pushes to `main` or `develop`.

For local validation, parse every JSON file with an equivalent structured JSON
parser. Do not use text matching as a substitute for parsing.

## Markdown Link Validation

`.github/workflows/check-markdown-links.yml` checks local Markdown links on
relevant pull requests and pushes to `main` or `develop`.

Documentation changes should also run:

```powershell
git diff --check
```

Run a Markdown linter when one is installed. The repository does not currently
declare a Markdown-lint dependency.

## Static Reference Validation

Check local `src` and `href` targets for modified pages. This is separate from
Markdown link validation.

The static-site regression test requires every local HTML `src` and `href`
target to exist and protects the Dictation pause/resume/reset source contract.

## Local Static Smoke Test

Start the static site as described in [`BUILD_GUIDE.md`](BUILD_GUIDE.md), then
check:

1. Root redirect and subject menu.
2. Chinese and English menus.
3. English and Chinese Dictation content loading.
4. Vocabulary static lookup.
5. Grammar catalog, lesson navigation, quizzes, and Dictation deep links.
6. Grammar Practice setup, 20-question sessions, autosave, submission, results,
   and history.
7. AI Teacher disabled behavior.
8. Sentences, Usage, Quiz, and Math placeholder behavior.
9. Browser console for unexpected backend or missing-data requests.

## Speech Validation

Where speech behavior is affected:

- test supported-browser playback;
- test Play/Stop and resume behavior;
- test word selection and highlighting;
- test unsupported speech behavior where implemented;
- record browser, platform, and voice limitations.

Use [`TTS_SPECIFICATION.md`](TTS_SPECIFICATION.md) and the detailed Grammar
Practice checklist in
[`development/grammar-practice-manual-test.md`](development/grammar-practice-manual-test.md).

## Production Verification

After an approved deployment:

1. Confirm the Pages build and deployment succeeded.
2. Confirm the deployed commit.
3. Run the production URL checks in
   [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md).
4. Record what was actually tested in
   [`VALIDATION_EVIDENCE.md`](VALIDATION_EVIDENCE.md) or the release manifest.

Do not infer browser, device, or production results from repository tests.
