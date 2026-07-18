# Development Guide

This guide defines the maintenance-phase development workflow for the Kids Learning repository.

## Branch Strategy

- `main`: production branch published by GitHub Pages.
- `develop`: integration branch for approved maintenance, content, documentation, and feature work.
- `feature/<short-name>`: focused feature work.
- `fix/<short-name>`: focused bug fix.
- `docs/<short-name>`: documentation-only work.

Normal development should not be committed directly to `main`. Release flow is `develop -> main` and requires explicit approval.

## Development Workflow

1. Start from the latest `develop` unless the user gives a different branch.
2. Read `AGENTS.md` and the relevant implementation/docs.
3. Confirm the working tree state before branch or release operations.
4. Make the smallest reasonable change.
5. Validate locally.
6. Report changed files, validation, skipped checks, and risks.
7. Wait for review when requested.

## Feature Workflow

For new learning features:

1. Define the learning goal and affected student page.
2. Identify affected HTML, CSS, JavaScript, JSON, docs, tests, and catalogs.
3. Preserve existing schemas unless a migration is approved.
4. Keep production static and GitHub Pages compatible.
5. Update documentation when behavior, structure, or workflow changes.
6. Add or update tests when the change affects shared behavior or data generation.

## Content Workflow

For lesson/content work:

1. Follow [CONTENT_STANDARD.md](CONTENT_STANDARD.md).
2. Modify only the required lesson JSON and catalog files.
3. Keep IDs and filenames stable unless a migration is approved.
4. Validate JSON syntax.
5. Validate lesson counts, quiz answers, and catalog references when applicable.
6. Do not modify protected pages or UI unless explicitly approved.

## Review Workflow

Review should check:

- Scope matches the task.
- UI/layout changes are intentional.
- JSON schemas are preserved or documented.
- Catalog references are valid.
- Student-facing pages remain static.
- Documentation is updated.
- Validation is credible and repeatable.
- No secrets or local-only files are included.

## Release Workflow

Use this flow only after explicit approval:

1. Confirm `develop` is clean and synchronized with `origin/develop`.
2. Validate existing checks.
3. Switch to `main`.
4. Pull `origin/main` using fast-forward only.
5. Merge `develop` into `main` with a normal merge commit.
6. Re-run validation.
7. Push `main` to `origin/main`.
8. Wait for GitHub Pages deployment.
9. Perform production smoke tests.

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## Documentation-Only Workflow

Documentation-only changes must not alter:

- `frontend/`
- `backend/`
- lesson JSON files
- CSS
- JavaScript
- GitHub Actions workflows
- tests

Validation should include the Markdown local-link check and a git diff review proving runtime files were not touched.

