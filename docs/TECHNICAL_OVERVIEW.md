# Technical Overview

This document describes the current Kids Learning implementation. The current
official production release is `v1.2.1`; `v1.0.0` is an immutable prior
baseline. The `v1.2.2` corrective release candidate contains the responsive
Grammar lesson navigation fix.

## Runtime Model

Kids Learning is a static GitHub Pages site.

- `index.html` at the repository root redirects to `frontend/index.html`.
- Student-facing pages are static HTML files under `frontend/`.
- Page scripts and styles are loaded from relative `frontend/js/` and `frontend/css/` paths.
- Learning content is loaded from relative `frontend/data/` JSON paths.
- No production backend, Azure service, login, or API health endpoint is required.

## Current Architecture

This document is the authority for the current tracked implementation.
Historical FastAPI, Azure, and backend endpoint context is retained separately
in [`SYSTEM_ARCHITECTURE_V1.md`](SYSTEM_ARCHITECTURE_V1.md) and
[`API_DEPENDENCY_AUDIT.md`](API_DEPENDENCY_AUDIT.md).

For product-level page ownership, navigation relationships, and page sections,
see [`WEBSITE_ARCHITECTURE.md`](WEBSITE_ARCHITECTURE.md).

## Main Pages

| Area | Entry file | Notes |
|---|---|---|
| Subject menu | `frontend/index.html` | Links to Chinese, English, and Math sections. |
| English menu | `frontend/eng.html` | Links to Vocabulary, Dictation, Grammar, Grammar Practice, and disabled AI Teacher. |
| English Dictation | `frontend/dictation_practice.html` | Uses `catalog.json`, dictation JSON, browser SpeechSynthesis, settings persistence, and Grammar deep links. |
| Chinese Dictation | `frontend/cn_dictation.html` | Uses static Chinese dictation JSON and browser SpeechSynthesis. |
| Grammar lessons | `frontend/grammar.html` | Loads category tabs and category-filtered lesson tabs from `grammar_catalog.json`; includes released Question Words and Quantifiers visual learning and guided mini-practice. |
| English Grammar Practice | `frontend/grammar_practice.html` | Separates the three normal 20-question modes from the manifest-driven Grammar Topic Quiz / Challenge entry; all results use browser-local history. |
| Practice history | `frontend/grammar_practice_history.html` | Reads browser-local practice records. |
| Practice result | `frontend/grammar_practice_result.html` | Displays one stored practice result. |
| Vocabulary | `frontend/vocab.html` | Uses static vocabulary JSON lookup. |
| AI Teacher | `frontend/ai_teacher.html` | Preserved but disabled for static production. |

## Data Architecture

All reviewed production content is committed under `frontend/data/`.

- `catalog.json`: English Dictation lesson catalog.
- `grammar_catalog.json`: Grammar lesson catalog, primary taxonomy category, and
  lesson order within each category.
- `grammar_*_lesson.json`: catalog-driven Grammar Gold Lessons, including released Question Words and Quantifiers with visual learning and guided mini-practice.
- `grammar_practice_choice.json`: 50 Question Words and 54 Quantifiers production choice questions with bilingual support.
- `grammar_practice_manifest.json`: Grammar Practice topic and bank metadata.
- `grammar_practice_short_long.json`: short/long answer question bank.
- `grammar_practice_rearrangement.json`: sentence rearrangement question bank.
- `vocab.json`, `vocab_ai.json`: vocabulary lookup data.
- `dictation*.json`, `cn_dictation*.json`: dictation content.

See [CONTENT_STANDARD.md](CONTENT_STANDARD.md) for schema details.

## Browser Storage

English Grammar Practice stores student progress locally in the browser.

- Primary storage: IndexedDB.
- Fallback storage: localStorage.
- Stored data is local to the browser and is not committed to the repository.

Dictation settings use localStorage for read mode, speech rate, and pause values.

## Speech and Audio

Student-facing speech primarily uses the browser Web Speech API:

- `speechSynthesis`
- `SpeechSynthesisUtterance`

The site should show controlled unsupported-state behavior where implemented and must not rely on backend TTS for production. Small files under `frontend/tts/` are legacy/static assets and are not the main pronunciation mechanism.

## Local Tools and Tests

The repository includes local tooling:

- `tools/generate_catalog.py`: regenerates English Dictation catalog entries from dictation JSON files.
- `tools/generate_grammar_practice_questions.py`: generates Grammar Practice question banks.
- `tools/validate_grammar_practice_questions.py`: validates Grammar Practice question banks.
- `tests/grammar_practice.test.js`: JavaScript tests for Grammar Practice core behavior.
- `tests/test_grammar_practice_questions.py`: Python tests for Grammar Practice question data.

## Automation

GitHub Actions currently provide:

- JSON parsing validation: `.github/workflows/validate-json.yml`
- local Markdown link validation: `.github/workflows/check-markdown-links.yml`

GitHub Pages deployment is handled by GitHub Pages static hosting, not by a custom repository deployment script.

## Backend Status

`backend/` is legacy/local-only. The current tracked directory contains an
example configuration, requirements, generated/reference output, and a source
workbook. It does not contain the FastAPI application or Azure generation
modules described by the historical architecture.

Do not add production dependencies on backend APIs without an approved architecture change.

## Docker Status

The tracked Dockerfile installs `backend/requirements.txt` and starts
`kids_ai_teacher:app`, but the corresponding tracked Python module is absent.
It is retained as an unsupported legacy artifact and is not a current build,
run, or production path.

## Known Implementation Issue

`frontend/ai_teacher.html` and `frontend/vocab.html` share
`frontend/css/styles.css`. The filename mismatch present in earlier snapshots
was corrected during `v1.1.0` release preparation.
