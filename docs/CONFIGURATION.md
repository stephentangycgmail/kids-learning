# Configuration

## Production

The GitHub Pages production site requires no application configuration, API
key, login, backend process, or environment file.

Production behavior comes from committed HTML, CSS, JavaScript, and JSON files.

## Local Backend Configuration

`backend/config.example.json` is a placeholder-only historical/local template.
If a future approved backend task requires local settings, copy values into
`backend/config.json` and keep that file outside Git.

Never commit:

```text
backend/config.json
.env
.env.*
*.key
*.pem
secrets.json
```

The current tracked tree does not contain the backend application module named
by the Dockerfile. The presence of the example configuration and requirements
does not establish a working backend runtime.

## Browser Storage

### Dictation settings

Dictation stores reading mode, speech speed, and pause preferences in
localStorage.

### Grammar Practice

Grammar Practice stores sessions in IndexedDB database
`kidsLearningGrammarPractice`, version 1. It falls back to localStorage key
`kidsLearning.grammarPractice.sessions.v1` when IndexedDB is unavailable.

Stored records remain on the current browser and device. Clearing site data
removes them.

## Catalog and Content Configuration

Current content discovery files are:

- `frontend/data/catalog.json`
- `frontend/data/grammar_catalog.json`
- `frontend/data/grammar_practice_manifest.json`

These are reviewed application data, not secret configuration. Follow
[`CONTENT_STANDARD.md`](CONTENT_STANDARD.md) before changing them.
