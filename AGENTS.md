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
