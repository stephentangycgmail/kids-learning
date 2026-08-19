# Master Task

This is the highest-level project specification for `stephentangycgmail/kids-learning`.

## Project Status

Kids Learning has an immutable `v1.0.0` tagged baseline and current official
release `v1.1.0`. GitHub Pages serves `main`; `develop` may contain unreleased
maintenance or UAT work. The project is in maintenance mode.

Production is static hosting from GitHub Pages. Azure, FastAPI, and backend APIs are not part of the current production deployment process.

## Project Vision

Kids Learning is a long-term educational platform for child-friendly learning activities. It should stay simple to host, easy to maintain, safe for students, and practical for reviewed content growth.

The platform should grow through stable static pages, reviewed JSON content, small improvements, and clear release discipline.

## Platform Philosophy

1. Static-first: production student pages must work on GitHub Pages.
2. Content-first: learning materials should be committed as reviewed JSON under `frontend/data/`.
3. Local-first tooling: scripts and backend files may support local generation, validation, or migration only.
4. Backward compatible: existing page URLs, JSON schemas, and catalog entries should remain stable unless a migration is approved.
5. No production API dependency: students should not need Azure, FastAPI, paid APIs, login, or a backend service.

## Repository Structure

```text
kids-learning/
+-- .github/workflows/   # JSON and Markdown validation
+-- frontend/            # Student-facing static website
+-- frontend/data/       # Reviewed JSON content and catalogs
+-- backend/             # Legacy/local-only tooling and generated output
+-- docs/                # Governance, standards, architecture, release docs
+-- tools/               # Local generation and validation scripts
+-- tests/               # Automated checks for Grammar Practice content
+-- AGENTS.md            # Codex repository instructions
+-- index.html           # GitHub Pages redirect to frontend/index.html
`-- README.md
```

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for the canonical folder reference.

## Current Architecture

- `index.html` redirects GitHub Pages visitors to `frontend/index.html`.
- Main subject pages are static HTML files under `frontend/`.
- Student data is fetched from relative `frontend/data/` JSON paths.
- English Dictation uses `catalog.json` plus dictation JSON files.
- Grammar lessons use `grammar_catalog.json` plus lesson JSON files.
- English Grammar Practice uses a static manifest and question banks with browser-local practice history.
- Browser speech uses the Web Speech API where available.
- AI Teacher is present but disabled for static production use.
- Backend files are retained as legacy/local-only tooling.

See [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md) for implementation details.

## Development Workflow

1. Inspect the relevant implementation and documentation.
2. Plan the change before editing when the task is non-trivial.
3. Make the smallest reasonable change.
4. Validate JSON, Markdown links, and affected static pages.
5. Report changed files, validation, risks, and follow-up recommendations.

## Branch Strategy

- `main`: production branch published by GitHub Pages.
- `develop`: integration branch for approved maintenance and feature work.
- `feature/*`, `fix/*`, `docs/*`: focused task branches when useful.

Normal development should not be committed directly to `main`. Release flow is `develop -> main` and requires explicit user approval before merging, pushing `main`, tagging, creating a GitHub Release, or deploying.

## Content Model

The current content model is catalog-driven where needed:

- English Dictation: `frontend/data/catalog.json`.
- Grammar lessons: `frontend/data/grammar_catalog.json`.
- Grammar Practice: `frontend/data/grammar_practice_manifest.json`.

Lesson JSON should remain backward compatible. Adding or renaming a lesson file requires updating the relevant catalog. See [CONTENT_STANDARD.md](CONTENT_STANDARD.md).

## Quality Gate

Before changes are accepted:

1. No secrets or local-only config are committed.
2. GitHub Pages compatibility is preserved.
3. Existing JSON compatibility is preserved or the migration is documented and approved.
4. Student-facing pages do not require backend APIs.
5. Markdown links are valid.
6. JSON files parse correctly.
7. Relevant static-page smoke tests are performed or explicitly reported as skipped.

## Release and Deployment

GitHub Pages is the official production deployment method. The current official
release is `v1.1.0`; `v1.0.0` remains an immutable baseline. See
[`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md).

Release preparation must confirm:

- working tree is clean
- `develop` is synchronized with `origin/develop`
- `main` is synchronized before the release merge
- validation passes
- the release merge is intentional
- GitHub Pages deployment succeeds
- production smoke tests pass

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

Repository release rules are maintained in
[`RELEASE_POLICY.md`](RELEASE_POLICY.md).

## Roadmap

Maintenance priorities:

- Fix production bugs.
- Improve lesson content quality.
- Preserve static hosting compatibility.
- Keep documentation aligned with implementation.
- Add small, well-tested improvements.

Future roadmap work belongs in [ROADMAP.md](ROADMAP.md), GitHub Issues, or dedicated planning documents.
