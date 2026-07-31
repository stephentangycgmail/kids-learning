# Release Notes

This file summarizes project history at a milestone level.

Verified tag and deployment identities are maintained in
[`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md). A production deployment is not
automatically an official release.

## v1.1.0 Release Candidate - July 2026

Focus:

- Promote the backward-compatible Offline English Grammar Practice feature
  already present in the later untagged production deployment into an official
  release identity.
- Preserve 20-question practice, submitted result review, local history,
  duration, resume, and abandoned-session behavior.
- Verify BUG-001 Dictation playback position behavior.
- Correct the shared Vocabulary and AI Teacher stylesheet filename.
- Include the current maintenance governance and fresh-agent handover.

Release boundary:

- GitHub Pages remains the only official deployment path.
- Docker remains a retained, unsupported legacy artifact.
- No production API, login, paid service, Azure dependency, or new Service
  Worker is introduced.
- Tag, GitHub Release, and final production evidence are pending until all
  release gates pass.

## v1.0.0 Tagged Baseline - 3 July 2026

Focus:

- Tagged commit `c2cbcba` as `v1.0.0`.
- Established Kids Learning on GitHub Pages static hosting.
- Confirmed the production runtime is static and does not use Azure, FastAPI, backend APIs, login, or `/api/health`.
- Confirmed `main` as the production branch and `develop` as the integration branch.

Release evidence:

- Immutable Git tag exists.
- GitHub Release is not present.
- No packaged artifact applies; Pages serves committed static files.

Key documents:

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)
- [CONTENT_STANDARD.md](CONTENT_STANDARD.md)
- [CHANGELOG.md](CHANGELOG.md)

## Offline English Grammar Practice - July 2026

Focus:

- Added 20-question Short & Long Answer, Sentence Rearrangement, and Mixed Practice sessions.
- Added 630 reviewed static questions covering present and past verb to be, present and past simple, present and past continuous, can/cannot, mixed tenses, and Wh-questions.
- Added automatic browser-local saving, unfinished-session restoration, submitted result review, and practice history.
- Preserved static GitHub Pages operation without an API or backend dependency.

Quality:

- Added deterministic Python question generation and validation tools.
- Added Node and Python regression tests.
- Historical notes report manual desktop, tablet, and mobile acceptance
  testing before deployment; no dated completed checklist is retained.

Deployment:

- Included in the untagged `main` deployment at commit `a3c6610` on
  17 July 2026.
- This post-tag deployment is not relabeled as `v1.0.0` or a later release.

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
