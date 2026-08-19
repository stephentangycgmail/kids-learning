# Kids Learning

Kids Learning is a static, GitHub Pages hosted learning website for
child-friendly English, Chinese, and Math practice. The repository has an
immutable `v1.0.0` tagged baseline and is now in maintenance mode.

The production site uses committed HTML, CSS, JavaScript, and JSON files. It does not require Azure, FastAPI, paid APIs, login, or a production backend during student use.

## Current Status

- Production platform: GitHub Pages static hosting.
- Production branch: `main`.
- Maintenance and integration branch: `develop`.
- Student-facing content lives mainly in `frontend/` and `frontend/data/`.
- Backend files are legacy/local-only tooling and are not part of the current production deployment.
- AI Teacher remains disabled for static production use while live API usage is paused.
- Current official release: `v1.1.0`, deployed from commit
  `67bf0d38282fa50e761b7c437cc40d12ac71a8f0`.
- See [Release Manifest](docs/RELEASE_MANIFEST.md) for verified release and
  deployment evidence.

## Website Areas

- Subject menu: `frontend/index.html`
- English menu: `frontend/eng.html`
- Vocabulary: `frontend/vocab.html`
- English Dictation Practice: `frontend/dictation_practice.html`
- Chinese Dictation: `frontend/cn_dictation.html`
- Grammar lessons: `frontend/grammar.html`
- Grammar includes released Question Words and Quantifiers lessons, each with
  visual bilingual learning cards and an 8-question guided mini-practice.
- English Grammar Practice: `frontend/grammar_practice.html`
- Question Words and Quantifiers Practice / Quiz: `frontend/grammar_practice_choice.html`
- Practice history and results: `frontend/grammar_practice_history.html`, `frontend/grammar_practice_result.html`

## Repository Structure

```text
kids-learning/
+-- .github/workflows/   # JSON and Markdown validation workflows
+-- .specs/              # Historical and completed implementation specifications
+-- frontend/            # Static website pages, scripts, styles, and data
+-- frontend/data/       # Reviewed JSON content and catalogs
+-- backend/             # Legacy/local-only tooling and generated support files
+-- docs/                # Governance, standards, architecture, and release docs
+-- tools/               # Local validation and content generation tools
+-- tests/               # Grammar Practice validation tests
+-- AGENTS.md            # Durable Codex repository guidance
+-- index.html           # GitHub Pages root redirect to frontend/index.html
`-- README.md
```

The canonical folder reference is [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md).

## Documentation Index

- [Master Task](docs/MASTER_TASK.md)
- [Technical Overview](docs/TECHNICAL_OVERVIEW.md)
- [AI Handover](docs/AI_HANDOVER.md)
- [User Guide](docs/USER_GUIDE.md)
- [Build and Local Run Guide](docs/BUILD_GUIDE.md)
- [Configuration](docs/CONFIGURATION.md)
- [Testing Guide](docs/TESTING_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Release Policy](docs/RELEASE_POLICY.md)
- [Release Manifest](docs/RELEASE_MANIFEST.md)
- [Validation Evidence](docs/VALIDATION_EVIDENCE.md)
- [Content Standard](docs/CONTENT_STANDARD.md)
- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Folder Structure](docs/FOLDER_STRUCTURE.md)
- [API Dependency Audit](docs/API_DEPENDENCY_AUDIT.md)
- [Changelog](docs/CHANGELOG.md)
- [Release Notes](docs/RELEASE_NOTES.md)
- [Grammar Practice Development Guide](docs/development/grammar-practice.md)
- [Grammar Practice Manual Test](docs/development/grammar-practice-manual-test.md)

## Content Model

The site reads static JSON from `frontend/data/`.

- `catalog.json` lists English dictation lessons.
- `grammar_catalog.json` lists Grammar lesson JSON files.
- Grammar Gold Lessons use one object per file with examples, practice questions, answer keys, and optional quiz data.
- Grammar Practice uses `grammar_practice_manifest.json` plus committed question banks,
  including 50 Question Words and 54 Quantifiers choice questions.
- Vocabulary uses `vocab.json` and `vocab_ai.json`.

See [docs/CONTENT_STANDARD.md](docs/CONTENT_STANDARD.md) for the current schemas and compatibility rules.

## Development Workflow

Normal work should happen on `develop` or an appropriate feature/fix/docs branch. Do not commit ordinary development changes directly to `main`.

Recommended flow:

```text
develop or feature branch
  -> inspect implementation and docs
  -> make the smallest safe change
  -> validate JSON, Markdown links, and affected static pages
  -> review
  -> merge develop to main only with explicit release approval
```

## Validation

Existing automated checks:

- `.github/workflows/validate-json.yml`
- `.github/workflows/check-markdown-links.yml`

For local work, run equivalent JSON parsing and Markdown local-link checks when relevant. For student-facing changes, also run static smoke tests through a local static server or the GitHub Pages URL after deployment.

See [docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md) for commands and known
baseline limitations.

## Known Issues

- The Dockerfile references a backend application module that is not present
  in the current tracked repository. It is retained as an unsupported legacy
  artifact and is not part of the GitHub Pages production process.

## Security Rules

Do not commit:

```text
backend/config.json
.env
.env.*
*.key
secrets.json
```

If an API key is ever exposed, regenerate it in the provider portal and update only local configuration.
