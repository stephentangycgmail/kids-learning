# Development Guide

This guide defines the long-term development workflow for the Kids Learning repository.

## Branch Strategy

Recommended branches:

- `main`: stable branch used by GitHub Pages.
- `epic/<number>-<name>`: multi-milestone work when needed.
- `feature/<short-name>`: focused feature or documentation work.
- `fix/<short-name>`: focused bug fix.
- `docs/<short-name>`: documentation-only work.

Keep branches short-lived when possible.

## Development Workflow

1. Start from the latest `main`.
2. Read the relevant docs and current implementation.
3. Create a small plan before editing.
4. Make focused changes.
5. Validate locally.
6. Record validation in the final report or pull request.
7. Merge only after review.

## Feature Workflow

For new learning features:

1. Define the learning goal.
2. Identify affected pages and JSON files.
3. Preserve existing schemas unless a schema migration is approved.
4. Add or update static JSON content only after review.
5. Confirm GitHub Pages can run the feature without backend APIs.
6. Update documentation.

## Review Workflow

Review should check:

- Scope matches the task.
- UI and layout changes are intentional.
- JSON schemas are preserved or documented.
- Student-facing pages remain static.
- Documentation is updated.
- Validation is credible and repeatable.
- No secrets or local files are included.

## Release Workflow

1. Confirm `main` is stable.
2. Review changed files and release notes.
3. Validate GitHub Pages entry points:
   - `index.html`
   - `frontend/index.html`
   - `frontend/cn.html`
   - `frontend/eng.html`
4. Validate affected learning pages.
5. Update [RELEASE_NOTES.md](RELEASE_NOTES.md).
6. Merge and deploy through GitHub Pages.
7. Perform a post-deploy smoke test.

## Documentation-Only Workflow

Documentation-only changes must not alter:

- `frontend/`
- `backend/`
- lesson content
- JSON files
- CSS
- JavaScript
- GitHub Pages routing

Validation should prove that runtime files were not touched.
