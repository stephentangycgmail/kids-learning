# Deployment Guide

This guide documents the current production deployment process for Kids Learning v1.0.0 and later maintenance releases.

The immutable `v1.0.0` tag and the current later Pages deployment are distinct.
See [`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md). Follow
[`RELEASE_POLICY.md`](RELEASE_POLICY.md) before creating a future official
release.

## Production Platform

Production uses GitHub Pages static hosting.

- Production branch: `main`
- Integration branch: `develop`
- Site entry point: repository root `index.html`
- Runtime website root after redirect: `frontend/index.html`
- Production URL: `https://stephentangycgmail.github.io/kids-learning/`

Azure is not part of the current release or deployment process.

## What Gets Deployed

GitHub Pages serves committed static files from the repository.

Important production paths:

- `index.html`
- `frontend/index.html`
- `frontend/eng.html`
- `frontend/dictation_practice.html`
- `frontend/grammar.html`
- `frontend/grammar_practice.html`
- `frontend/data/catalog.json`
- `frontend/data/grammar_catalog.json`
- `frontend/data/grammar_practice_manifest.json`

Production should not depend on `/api/health`, FastAPI routes, Azure services, or backend runtime processes.

## Release Preconditions

Before merging `develop` into `main`:

1. Confirm the working tree is clean.
2. Confirm `develop` is synchronized with `origin/develop`.
3. Confirm `main` is synchronized with `origin/main`.
4. Run existing validation:
   - JSON validation
   - Markdown local-link check
   - relevant JavaScript/Python tests when affected
5. Review changed files and release notes.
6. Stop on merge conflicts, failed validation, or unclear production state.

## Release Flow

Use this flow only with explicit user approval:

```text
develop
  -> validate
  -> switch to main
  -> fast-forward pull origin/main
  -> merge develop into main with a normal merge commit
  -> validate again
  -> push main to origin/main
  -> wait for GitHub Pages deployment
  -> production smoke test
```

Do not force push. Do not create tags, GitHub Releases, or deployments unless explicitly instructed.

A successful Pages deployment does not by itself create or rename an official
release.

## GitHub Pages Verification

After pushing `main`, verify the GitHub Pages build/deployment in GitHub Actions or the repository Pages deployment UI.

Expected result:

- Pages build succeeds.
- Pages deploy succeeds.
- Production URL serves the new `main` commit content after propagation.

## Production Smoke Tests

Check these static URLs after deployment:

- `https://stephentangycgmail.github.io/kids-learning/`
- `https://stephentangycgmail.github.io/kids-learning/frontend/index.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/eng.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/dictation_practice.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/vocab.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/grammar.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/grammar_practice.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/ai_teacher.html`
- `https://stephentangycgmail.github.io/kids-learning/frontend/data/catalog.json`
- `https://stephentangycgmail.github.io/kids-learning/frontend/data/grammar_catalog.json`
- `https://stephentangycgmail.github.io/kids-learning/frontend/data/grammar_practice_manifest.json`

Smoke-test expectations:

- Main menu loads.
- English menu loads.
- Dictation Practice loads catalog-based content.
- Vocabulary page loads local data.
- Grammar page loads catalog-driven lessons and optional quizzes.
- Grammar Practice loads static question banks.
- AI Teacher page remains disabled without backend API calls.
- Required JSON files return HTTP 200.
- Vocabulary and AI Teacher load `frontend/css/styles.css` without a CSS 404.

Do not check `/api/health` for production static hosting.

## Failure Handling

Stop and report before making changes if:

- working tree is dirty before release operations
- branch history diverges
- merge conflicts occur
- validation fails
- GitHub Pages deployment fails
- production serves the wrong commit after reasonable propagation time
- authentication or remote configuration is unexpected
