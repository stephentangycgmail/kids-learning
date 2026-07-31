# AGENTS.md

Durable instructions for future Codex work in the Kids Learning repository.

## Project Status

- Kids Learning has an immutable `v1.0.0` tagged baseline. The current GitHub
  Pages deployment contains later untagged changes; see
  `docs/RELEASE_MANIFEST.md`.
- Production is static hosting from GitHub Pages.
- Azure is not part of the current deployment process. Backend and Azure-related code is legacy/local-only unless a future approved task says otherwise.
- The project is in maintenance mode: prioritise reliability, content quality, compatibility, and small safe improvements.

## Branch Rules

- `main` is the production branch.
- Do not make normal development changes directly on `main`.
- Use `develop` or an appropriate `feature/*`, `fix/*`, or `docs/*` branch for ordinary work.
- Normal release flow is `develop -> main` after explicit approval.
- Never force push.
- Before release, branch switching, merge, tag, or deployment work, stop if the working tree is not clean.
- Do not merge into `main`, push `main`, create tags, create GitHub Releases, or deploy unless the user explicitly instructs it.

## Change Discipline

- Inspect the relevant repository documentation and code before editing.
- Make the smallest reasonable change that satisfies the request.
- Do not modify unrelated files.
- Preserve backward compatibility unless the user explicitly approves a breaking change.
- Avoid large-scale refactoring unless it is specifically requested and justified.
- Never discard, stash, apply, or delete user changes without permission.
- Clearly report modified files, validation performed, skipped checks, and important decisions.

## Task-Based Reading

Read this file first, then only the authorities needed for the task:

| Task | Required reading |
| --- | --- |
| Small bug fix | The affected rule in [`docs/MASTER_TASK.md`](docs/MASTER_TASK.md), [`docs/CONTENT_STANDARD.md`](docs/CONTENT_STANDARD.md), or a feature specification; affected implementation and related tests |
| Exercise or question-rule change | [`docs/CONTENT_STANDARD.md`](docs/CONTENT_STANDARD.md), affected JSON/generator, related tests, and the relevant [`docs/USER_GUIDE.md`](docs/USER_GUIDE.md) section |
| Dictation or speech change | [`docs/TTS_SPECIFICATION.md`](docs/TTS_SPECIFICATION.md), affected Dictation implementation/content, related tests, and the Dictation section of the User Guide |
| Grammar or sentence-rearrangement change | [`docs/CONTENT_STANDARD.md`](docs/CONTENT_STANDARD.md), affected content/generator and implementation, related tests, and the relevant User Guide section |
| UI or layout change | Relevant User Guide section, affected HTML/CSS/JavaScript, accessibility/responsive expectations, and related tests |
| Content-only update | [`docs/CONTENT_STANDARD.md`](docs/CONTENT_STANDARD.md), affected JSON/catalog, validation tools, and content tests |
| Test-only change | [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md), the rules being tested, and affected tests |
| GitHub Pages or deployment | [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md), affected workflow/site configuration, and relevant checks |
| Release or version work | [`docs/RELEASE_POLICY.md`](docs/RELEASE_POLICY.md), [`docs/RELEASE_MANIFEST.md`](docs/RELEASE_MANIFEST.md), changelog/release notes, deployment guidance, and applicable evidence |
| Documentation only | This file, the target source of truth, and direct references only |
| Architecture or handover | [`docs/AI_HANDOVER.md`](docs/AI_HANDOVER.md), [`docs/TECHNICAL_OVERVIEW.md`](docs/TECHNICAL_OVERVIEW.md), and directly affected build/deployment authorities |

If no row fits, read the closest current rule, affected implementation, and
related tests, then stop for clarification if authority remains ambiguous.
Do not treat `.specs/`, sprint reports, task briefs, changelogs, dated audits,
validation evidence, or release notes as current instructions unless the task
is historical, audit, or release work.

## Durable Maintenance Constraints

- Preserve the static GitHub Pages runtime and existing JSON compatibility.
- Grammar Practice sessions contain 20 questions; submitted and abandoned
  records remain locked. Submitted records retain score, review, and duration
  evidence. Abandoned records remain distinguishable and retain duration, but
  do not receive a score summary or completed-answer review unless the current
  runtime and tests explicitly implement that behavior.
- Preserve sentence-rearrangement token identity, punctuation, and
  capitalization rules defined by current content, implementation, and tests.
- Preserve Dictation resume, stop/reset, natural-completion, settings, and
  unsupported-speech behavior unless explicitly changed.
- Keep reviewed content in committed JSON and do not add a live student API,
  login, production backend, or new Service Worker dependency without an
  approved architecture change.
- Preserve `develop` as integration and `main` as production. Maintenance work
  must not become an unrequested redesign or broad refactor.

## Documentation Synchronization Requirement

Every implementation change requires a documentation-impact review. In the
same pull request, update the authoritative and directly affected
documentation when functionality, student-facing behavior, business or
validation rules, architecture, source structure, configuration, dependencies,
build or run procedures, tests, deployment, security, known limitations,
project status, or release status changes.

This review must specifically consider Dictation, Grammar, Grammar Practice,
Vocabulary, AI Teacher availability, content catalogs and JSON structures,
browser storage and history, TTS behavior, GitHub Pages deployment, tests,
configuration, architecture, releases, and known limitations when relevant.

Do not duplicate policy across unrelated documents or make cosmetic updates
that do not improve accuracy. A pull request is incomplete when relevant
documentation is missing unless it clearly records why no documentation
change is required.

## Content and Data Rules

- Follow `docs/CONTENT_STANDARD.md`.
- Preserve existing JSON compatibility and file naming unless a migration is explicitly approved.
- When adding, removing, or renaming lesson JSON files, update the relevant catalog file.
- Current catalogs include `frontend/data/catalog.json`, `frontend/data/grammar_catalog.json`, and `frontend/data/grammar_practice_manifest.json`.
- Validate JSON after content or data changes.
- Keep reviewed learning content under `frontend/data/`.
- Do not commit secrets or local-only config such as `backend/config.json`, `.env`, keys, or secret JSON files.

## Testing and Validation

- Use `docs/TESTING_GUIDE.md` as the current validation entry point.
- Run the repository's existing validation when relevant:
  - JSON validation from `.github/workflows/validate-json.yml`
  - Markdown link check from `.github/workflows/check-markdown-links.yml`
- Perform relevant static-page smoke tests for touched student-facing pages.
- For production checks, verify GitHub Pages URLs rather than backend API endpoints.
- Do not check `/api/health` for production static hosting unless documentation changes to require it.
- Do not claim success when tests were skipped, unavailable, or failed. Report that plainly.

## Release and Deployment Safety

- GitHub Pages is the official production deployment method.
- Follow `docs/RELEASE_POLICY.md`, `docs/RELEASE_MANIFEST.md`, and
  `docs/DEPLOYMENT_GUIDE.md`. Do not treat every Pages deployment as a new
  release.
- Do not invent an Azure deployment procedure.
- Stop on merge conflicts, failed validation, failed Pages deployment, or unclear production state.
- For releases, confirm:
  - working tree is clean
  - `main` and `origin/main` are synchronised
  - release tag points to the intended commit
  - GitHub Pages deployment succeeds
  - production smoke tests pass

## Documentation

- Documentation authority:
  - this file: durable repository and AI-agent rules
  - `docs/MASTER_TASK.md`: durable product constraints
  - `docs/PROJECT_DASHBOARD.md`: current status
  - `docs/ROADMAP.md`: future priorities
  - `docs/TECHNICAL_OVERVIEW.md`: current architecture
  - `docs/AI_HANDOVER.md`: fresh-agent maintenance and recovery entry point
  - `docs/SYSTEM_ARCHITECTURE_V1.md`: historical architecture
- Keep `README.md` and related docs consistent when behavior, structure, workflow, or deployment changes.
- Use GitHub Issues or `docs/MASTER_TASK.md` for roadmap and future work. Do not turn this file into a task backlog.
- If documentation and implementation disagree, report the mismatch before making broad changes.

## Known Deferred Implementation Issues

- `frontend/ai_teacher.html` and `frontend/vocab.html` reference missing
  `frontend/css/styles.css`. Do not hide this in documentation or claim the
  local asset check passes until a separate bug-fix task resolves it.
- The Dockerfile references a backend application module that is not present
  in the tracked repository. Document the current state; do not classify
  Docker support as retired or supported without an approved decision.
