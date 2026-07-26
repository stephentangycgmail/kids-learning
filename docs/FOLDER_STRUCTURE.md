# Folder Structure

This is the canonical folder structure reference for the Kids Learning repository.

## Top Level

```text
kids-learning/
+-- .github/workflows/
+-- .specs/
+-- frontend/
+-- backend/
+-- docs/
+-- tools/
+-- tests/
+-- AGENTS.md
+-- index.html
+-- README.md
+-- Dockerfile
`-- .gitignore
```

## `.github/workflows/`

Repository validation workflows:

- `validate-json.yml`: parses repository JSON files on relevant pull requests and pushes to `main` or `develop`.
- `check-markdown-links.yml`: checks local Markdown links on relevant pull requests and pushes to `main` or `develop`.

## `.specs/`

Historical and completed implementation specifications. These files record the
requirements used for individual milestones and are not current roadmap or
task authority unless a new task explicitly adopts them.

## `frontend/`

Student-facing static website files.

```text
frontend/
+-- index.html
+-- cn.html
+-- eng.html
+-- math.html
+-- dictation_practice.html
+-- cn_dictation.html
+-- grammar.html
+-- grammar_practice.html
+-- grammar_practice_history.html
+-- grammar_practice_result.html
+-- vocab.html
+-- ai_teacher.html
+-- sentences.html
+-- usage.html
+-- quiz.html
+-- css/
+-- js/
+-- data/
+-- tts/
`-- service-worker.js
```

Rules:

- Must remain compatible with GitHub Pages.
- Should not require FastAPI or backend APIs during student use.
- Existing layout and learning flow should remain stable unless a task explicitly permits changes.
- Static JSON learning content belongs in `frontend/data/`.

## `frontend/data/`

Reviewed static learning data and catalogs.

Current categories:

- English Dictation catalog and JSON files.
- Chinese Dictation JSON files.
- Grammar lesson catalog and Gold Lesson JSON files.
- English Grammar Practice manifest and question banks.
- Vocabulary JSON and vocabulary hint JSON.
- Legacy/reference tenses JSON and source text files.

Rules:

- Keep existing schemas stable.
- Validate JSON syntax before commit.
- Update the relevant catalog when adding, removing, or renaming catalog-driven lesson files.
- Do not rename lesson files without approval.
- Do not commit unreviewed generated lesson batches.

## `frontend/js/`

Student-facing JavaScript.

Current categories:

- Shared static JSON helper and disabled API placeholders.
- Vocabulary, usage, quiz, AI Teacher, and Grammar Practice scripts.
- Browser-local Grammar Practice storage and result/history rendering.

Rules:

- Avoid backend calls in static student pages.
- Preserve browser SpeechSynthesis behavior where used.
- Keep AI Teacher disabled until a future approved design exists.

## `frontend/css/`

Student-facing stylesheets, including Grammar Practice styles.

Rules:

- Keep existing UI style stable unless a task explicitly asks for UI changes.
- Validate affected pages after CSS changes.

## `tools/`

Local generation and validation scripts.

Current tools:

- `generate_catalog.py`
- `generate_grammar_practice_questions.py`
- `validate_grammar_practice_questions.py`

Rules:

- Tools may generate draft or validated JSON, but reviewed output must be committed under the expected content path.
- Do not add external package dependencies without approval.

## `tests/`

Automated tests and validation checks for local development.

Current tests:

- `grammar_practice.test.js`
- `test_grammar_practice_questions.py`

## `backend/`

Legacy/local-only tooling and generated output.

Current tracked contents include:

- `config.example.json`
- `requirements.txt`
- `output/*.json`
- `vocab_source.xlsx`

The tracked tree does not currently include the historical FastAPI application
or Azure generation modules described in older architecture records.

Rules:

- Backend files may remain for future content generation, validation, or migration work.
- Backend is not required for GitHub Pages student use.
- Do not commit `backend/config.json`.
- Do not expose API keys or local secrets.

## Root `Dockerfile`

The Dockerfile is retained and references `kids_ai_teacher:app`, but the
corresponding backend application module is not present. Docker is not part of
GitHub Pages production. Its future support status is intentionally undecided.

## `docs/`

Project governance, architecture, workflow, standards, and planning documents.

Core documents:

- [MASTER_TASK.md](MASTER_TASK.md)
- [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [BUILD_GUIDE.md](BUILD_GUIDE.md)
- [CONFIGURATION.md](CONFIGURATION.md)
- [TESTING_GUIDE.md](TESTING_GUIDE.md)
- [USER_GUIDE.md](USER_GUIDE.md)
- [RELEASE_POLICY.md](RELEASE_POLICY.md)
- [RELEASE_MANIFEST.md](RELEASE_MANIFEST.md)
- [CONTENT_STANDARD.md](CONTENT_STANDARD.md)
- [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md)
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [ROADMAP.md](ROADMAP.md)
- [RELEASE_NOTES.md](RELEASE_NOTES.md)
- [CHANGELOG.md](CHANGELOG.md)

Supporting documents:

- Architecture and API audit documents.
- JSON and lesson package standards.
- Content generation plans.
- Historical sprint reports.
- Codex task briefs.
- Review and development notes.

Do not move documents until references are updated in the same change.
