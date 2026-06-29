# Project Structure

This repository keeps the current website structure unchanged first. The goal is to make the existing project safer and easier to maintain before changing the content generation method.

## Current folders

```text
kids-learning/
├── frontend/              # Static website files
│   ├── index.html
│   ├── kids_menu.html
│   ├── dictation_practice.html
│   ├── grammar.html
│   ├── vocab.html
│   ├── ai_teacher.html
│   ├── css/
│   ├── js/
│   ├── data/
│   └── tts/
│
├── backend/               # Existing backend/content generation support files
│   ├── output/
│   ├── requirements.txt
│   ├── vocab_source.xlsx
│   └── config.example.json
│
├── deploy/                # Deployment-related files, excluding generated zip files
├── Dockerfile
├── .gitignore
└── docs/
```

## Important rule

Do not commit real API keys, passwords, or local-only configuration files.

The real local file below must stay on the local computer only:

```text
backend/config.json
```

Use this safe template in GitHub instead:

```text
backend/config.example.json
```

## Current website behavior

The current website mainly reads static HTML, JavaScript, CSS, and JSON files from `frontend/`.

The pronunciation feature uses browser Text-to-Speech where implemented, not large stored audio files.

## Later direction

The future direction is to reduce or remove live API usage and generate teaching materials as JSON files first, then let the website read those JSON files directly.

That change should be done gradually after the current site structure is documented and stable.
