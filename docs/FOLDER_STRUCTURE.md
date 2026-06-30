# Folder Structure

This is the canonical folder structure reference for the Kids Learning repository.

## Top Level

```text
kids-learning/
+-- frontend/
+-- backend/
+-- docs/
+-- index.html
+-- README.md
+-- Dockerfile
`-- .gitignore
```

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

Reviewed static learning data.

Current categories:

- English dictation JSON.
- Chinese dictation JSON.
- Grammar/tenses JSON.
- Vocabulary JSON.
- Vocabulary hint JSON.

Rules:

- Keep existing schemas stable.
- Validate JSON syntax before commit.
- Do not rename lesson files without approval.
- Do not commit unreviewed generated lesson batches.

## `frontend/js/`

Student-facing JavaScript.

Rules:

- Avoid backend calls in static student pages.
- Preserve browser SpeechSynthesis behavior.
- Keep AI Teacher disabled until a future approved design exists.

## `backend/`

Legacy/local-only tooling and generated output.

Rules:

- Backend files may remain for future content generation, validation, or migration work.
- Backend is not required for GitHub Pages student use.
- Do not commit `backend/config.json`.
- Do not expose API keys or local secrets.

## `docs/`

Project governance, architecture, workflow, and planning documents.

Canonical governance documents:

- [MASTER_TASK.md](MASTER_TASK.md)
- [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md)
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [ROADMAP.md](ROADMAP.md)
- [RELEASE_NOTES.md](RELEASE_NOTES.md)

Supporting documents:

- Architecture and API audit documents.
- JSON specification.
- Content generation plan.
- Historical sprint reports.
- Codex task briefs.

## Documentation Organization Direction

Future milestones may reorganize `docs/` into subfolders such as:

```text
docs/
+-- architecture/
+-- development/
+-- standards/
+-- roadmap/
`-- operations/
```

Do not move documents until references are updated in the same change.
