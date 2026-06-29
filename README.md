# Kids Learning Website

A local-first kids English learning website with static frontend pages, JSON-based learning content, and optional backend utilities for generating or maintaining data files.

The current priority is to keep the existing website working while gradually moving away from live API-based content generation. New learning materials should be generated as JSON files first, reviewed, and then committed into `frontend/data/`.

## Current Status

- Frontend website is stored in `frontend/`.
- Learning content is mainly stored as JSON files under `frontend/data/`.
- Browser speech is mainly handled by the Web Speech API, not by large stored audio files.
- Azure/OpenAI API usage is planned to be phased out.
- `backend/config.json` is a local-only secret file and must never be committed.

## Repository Structure

```text
kids-learning/
├── frontend/          # Static website files: HTML, CSS, JS, JSON, small audio assets
├── backend/           # Local tools and generated data support files
├── deploy/            # Deployment-related files, generated zip packages are ignored
├── docs/              # Project documentation and future Codex task references
├── Dockerfile         # Existing container configuration
├── .gitignore         # Prevents secrets and generated files from being committed
└── README.md          # Project overview
```

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
    ↓
ChatGPT reviews and prepares a clear task plan
    ↓
Codex modifies the repository
    ↓
ChatGPT reviews the changes
    ↓
Commit / merge after confirmation
```

For now, do not restructure the frontend or rewrite major logic unless a specific task requires it.

## Future Direction

The long-term goal is:

```text
ChatGPT / Codex generates learning content
    ↓
Content is saved as JSON
    ↓
Website reads static JSON files
    ↓
No live API call is needed during student use
```

This keeps hosting simple, reduces cost, and makes the project easier to maintain with GitHub Pages or other static hosting.
