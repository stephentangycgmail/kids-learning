# Kids Learning Website

A local-first kids learning website with static frontend pages, JSON-based learning content, and optional backend utilities for generating or maintaining data files.

The current priority is to keep the student-facing website working on GitHub Pages while gradually moving away from live API-based content generation. New learning materials should be generated as JSON files first, reviewed, and then committed into `frontend/data/`.

## Current Status

- Frontend website is stored in `frontend/`.
- Learning content is mainly stored as JSON files under `frontend/data/`.
- Browser speech is mainly handled by the Web Speech API, not by large stored audio files.
- Backend files are preserved as legacy/local-only tooling.
- `backend/config.json` is a local-only secret file and must never be committed.

## Repository Structure

```text
kids-learning/
+-- frontend/      # Static website files: HTML, CSS, JS, JSON, small audio assets
+-- backend/       # Local tools and generated data support files
+-- docs/          # Governance, architecture, workflow, and planning docs
+-- Dockerfile     # Existing container configuration
+-- index.html     # GitHub Pages redirect to frontend/index.html
+-- .gitignore     # Prevents secrets and generated files from being committed
`-- README.md      # Project overview
```

The canonical structure reference is [docs/FOLDER_STRUCTURE.md](docs/FOLDER_STRUCTURE.md).

## Documentation Index

Governance:

- [Master Task](docs/MASTER_TASK.md)
- [Codex Playbook](docs/CODEX_PLAYBOOK.md)
- [Folder Structure](docs/FOLDER_STRUCTURE.md)
- [Development Guide](docs/DEVELOPMENT_GUIDE.md)
- [Roadmap](docs/ROADMAP.md)
- [Release Notes](docs/RELEASE_NOTES.md)

Supporting docs:

- [System Architecture](docs/SYSTEM_ARCHITECTURE_V1.md)
- [API Dependency Audit](docs/API_DEPENDENCY_AUDIT.md)
- [Content Generation Plan](docs/CONTENT_GENERATION_PLAN.md)
- [JSON Specification](docs/JSON_SPECIFICATION.md)
- [Codex Workflow](docs/CODEX_WORKFLOW.md)
- [Changelog](docs/CHANGELOG.md)

## Important Security Rules

Do not commit these files:

```text
backend/config.json
.env
.env.*
*.key
secrets.json
```

If an API key is ever exposed, regenerate it immediately in the provider portal and update only the local configuration file.

## Development Workflow

Recommended workflow:

```text
User requirement
  -> analyze current repository state
  -> plan the change
  -> implement the smallest safe change
  -> validate GitHub Pages compatibility
  -> report changed files, validation, and risks
```

For detailed branch, review, and release workflow, see [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md).

## Future Direction

The long-term goal is:

```text
ChatGPT / Codex generates learning content
  -> content is saved as reviewed JSON
  -> website reads static JSON files
  -> no live API call is needed during student use
```

This keeps hosting simple, reduces cost, and makes the project easier to maintain with GitHub Pages or other static hosting.
