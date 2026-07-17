# Release Notes

This file summarizes project history at a milestone level.

## Offline English Grammar Practice - July 2026

Focus:

- Added 20-question Short & Long Answer, Sentence Rearrangement, and Mixed Practice sessions.
- Added 630 reviewed static questions covering present and past verb to be, present and past simple, present and past continuous, can/cannot, mixed tenses, and Wh-questions.
- Added automatic browser-local saving, unfinished-session restoration, submitted result review, and practice history.
- Preserved static GitHub Pages operation without an API or backend dependency.

Quality:

- Added deterministic Python question generation and validation tools.
- Added Node and Python regression tests.
- Completed manual desktop, tablet, and mobile acceptance testing before deployment.

## Sprint 1 - Project Audit and Safety Foundation

Focus:

- Documented the existing system.
- Established initial architecture notes.
- Audited API/backend dependencies.
- Confirmed `frontend/` as the student-facing static website.
- Confirmed `backend/config.json` must remain local-only.

Key documents:

- [SYSTEM_ARCHITECTURE_V1.md](SYSTEM_ARCHITECTURE_V1.md)
- [API_DEPENDENCY_AUDIT.md](API_DEPENDENCY_AUDIT.md)
- [SPRINT_1_REPORT.md](SPRINT_1_REPORT.md)

## Sprint 2 - Static GitHub Pages Runtime

Focus:

- Disabled AI Teacher for public student use while preserving files.
- Migrated student-facing pages toward static GitHub Pages operation.
- Preserved existing UI layout and JSON schemas.
- Kept backend code as legacy/local-only tooling.

Key documents:

- [SPRINT_2_REPORT.md](SPRINT_2_REPORT.md)
- [CODEX_TASKS/001_DISABLE_AI_TEACHER.md](CODEX_TASKS/001_DISABLE_AI_TEACHER.md)
- [CODEX_TASKS/002_STATIC_GITHUB_PAGES_MIGRATION.md](CODEX_TASKS/002_STATIC_GITHUB_PAGES_MIGRATION.md)

## Epic 001 - Milestone 1 Project Governance

Focus:

- Established long-term governance documents.
- Defined Codex operating rules.
- Defined canonical folder structure.
- Defined development, review, and release workflow.
- Reframed the roadmap around Version 2, Version 2.5, Version 3, and Future.

Documentation created:

- [MASTER_TASK.md](MASTER_TASK.md)
- [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md)
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [RELEASE_NOTES.md](RELEASE_NOTES.md)

Documentation updated:

- [ROADMAP.md](ROADMAP.md)
- [README.md](../README.md)
- [CHANGELOG.md](CHANGELOG.md)

Runtime impact:

- None intended.
- No frontend, backend, CSS, JavaScript, JSON, or lesson files should be changed by this milestone.
