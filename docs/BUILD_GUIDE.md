# Build and Local Run Guide

Kids Learning production is a static GitHub Pages site. There is no frontend
compile, bundling, or packaging step.

## Production Build Model

GitHub Pages serves committed files from `main` at the repository root.
The root `index.html` redirects to `frontend/index.html`.

Production does not require:

- `npm install`
- a frontend build command
- Python packages
- FastAPI
- Azure
- Docker

Deployment is documented in
[`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md).

## Local Static Server

Do not open pages only through `file://`, because browser fetch restrictions can
prevent JSON loading. From the repository root, use a local static server.

Python example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Stop the server when testing is complete.

## Validation Runtimes

- Node.js is required for `tests/grammar_practice.test.js`.
- Python 3 is required for the Python tests and tools.
- The committed Grammar Practice tools use the Python standard library.
- JSON and Markdown checks run in GitHub Actions with Node.js 20.

Commands are maintained in
[`TESTING_GUIDE.md`](TESTING_GUIDE.md).

## Docker Current Situation

The repository contains a historical `Dockerfile` and
`backend/requirements.txt`. The Dockerfile attempts to run:

```text
uvicorn kids_ai_teacher:app
```

The current tracked repository does not contain
`backend/kids_ai_teacher.py`, so the Docker image cannot start that declared
application from the current tree.

This guide does not classify Docker support as retired or supported. Do not use
Docker as the documented production or local validation path until a separate
approved task decides and verifies its status.

Historical backend context is retained in
[`SYSTEM_ARCHITECTURE_V1.md`](SYSTEM_ARCHITECTURE_V1.md) and
[`API_DEPENDENCY_AUDIT.md`](API_DEPENDENCY_AUDIT.md).
