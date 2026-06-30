# Project Structure

This repository keeps the student-facing website static-first for GitHub Pages.

## Current Folders

```text
kids-learning/
+-- frontend/              # Static website files
|   +-- index.html
|   +-- cn.html
|   +-- eng.html
|   +-- math.html
|   +-- dictation_practice.html
|   +-- cn_dictation.html
|   +-- grammar.html
|   +-- vocab.html
|   +-- ai_teacher.html
|   +-- sentences.html
|   +-- usage.html
|   +-- quiz.html
|   +-- css/
|   +-- js/
|   +-- data/
|   `-- tts/
+-- backend/               # Existing backend/content generation support files
|   +-- output/
|   +-- requirements.txt
|   +-- vocab_source.xlsx
|   `-- config.example.json
+-- docs/
+-- Dockerfile
`-- .gitignore
```

## Important Rule

Do not commit real API keys, passwords, or local-only configuration files.

The real local file below must stay on the local computer only:

```text
backend/config.json
```

Use this safe template in GitHub instead:

```text
backend/config.example.json
```

## Current Website Behavior

The current website reads static HTML, JavaScript, CSS, and JSON files from `frontend/`.

Pronunciation features use browser Text-to-Speech where implemented, not live backend TTS.

## Later Direction

Keep reducing live API usage by generating teaching materials as reviewed JSON files first, then letting the website read those JSON files directly.
