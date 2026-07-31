# AI Handover

This is the fresh-agent entry point for maintaining Kids Learning. Root
[`AGENTS.md`](../AGENTS.md) remains authoritative; use its task-based routing
instead of reading every document.

## Current State

- Production is a static GitHub Pages site served from `main`.
- Normal maintenance uses a focused branch based on `develop`, then integrates
  through `develop`.
- `v1.0.0` is immutable; current Pages content is a later untagged deployment.
- The next official release is planned as `v1.1.0`; verify the release manifest
  and Git state before treating it as completed.
- The project is in maintenance mode. Prefer focused fixes and compatible
  content improvements over redesign or broad refactoring.
- Student use requires no login, production backend, paid API, or Azure
  service. AI Teacher remains disabled.

## Where to Start

| Need | Current authority |
| --- | --- |
| Product constraints | [`MASTER_TASK.md`](MASTER_TASK.md) |
| Current architecture and entry points | [`TECHNICAL_OVERVIEW.md`](TECHNICAL_OVERVIEW.md) |
| Student workflow | [`USER_GUIDE.md`](USER_GUIDE.md) |
| Content and JSON rules | [`CONTENT_STANDARD.md`](CONTENT_STANDARD.md) |
| Tests and evidence boundaries | [`TESTING_GUIDE.md`](TESTING_GUIDE.md) |
| Local run/build boundary | [`BUILD_GUIDE.md`](BUILD_GUIDE.md) |
| GitHub Pages deployment | [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) |
| Release identity and approval | [`RELEASE_POLICY.md`](RELEASE_POLICY.md) and [`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md) |
| Contributor workflow | [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) |
| Future priorities | [`ROADMAP.md`](ROADMAP.md) |

Historical architecture, `.specs/`, sprint reports, completed Codex tasks,
changelog entries, validation evidence, and dated audits explain prior state;
they do not silently override the current authorities above.

## Runtime and Data Map

- Root `index.html` redirects to `frontend/index.html`.
- Student pages and scripts are under `frontend/`.
- Reviewed content and catalogs are under `frontend/data/`.
- Grammar Practice behavior is split across `frontend/js/grammar_practice_*`;
  tests are under `tests/` and generation/validation tools under `tools/`.
- Browser-local progress uses IndexedDB with localStorage fallback. Clearing
  site data removes local history and preferences.
- `backend/` and the Dockerfile are not the production path. Docker support is
  undecided because its referenced application module is absent.

## Validation and Delivery

Use only checks relevant to the change and report omissions. Commands and
known baseline failures are in [`TESTING_GUIDE.md`](TESTING_GUIDE.md).
Documentation changes require the Markdown-link workflow equivalent and
`git diff --check`. Content changes require JSON parsing plus applicable
catalog, generator, validator, and consumer checks. Student-facing changes
require a static-site smoke test.

Do not merge to `main`, tag, create a GitHub Release, or deploy without
explicit approval. The normal release path is reviewed `develop -> main`,
followed by Pages verification and production smoke testing.

## Known Boundaries

- Docker references a missing backend module and is retained as an unsupported
  legacy artifact. GitHub Pages is the only official deployment path.
- BUG-001 Dictation resume behavior was verified during `v1.1.0` release
  preparation; retain its playback-state regression coverage.
- Browser speech varies by platform and installed voices; repository tests do
  not prove production speech behavior.

When documents and implementation materially disagree, report the evidence
before changing behavior. Never infer a release, production acceptance, or
completed manual test from historical wording alone.
