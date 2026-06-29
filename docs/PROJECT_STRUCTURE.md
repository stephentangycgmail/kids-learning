# Project Structure

This document records the current structure of the Kids Learning Website repository. The first cleanup phase should document the existing system without changing website behavior.

## Top Level

```text
kids-learning/
├── frontend/
├── backend/
├── deploy/
├── Dockerfile
├── .gitignore
└── README.md
```

## `frontend/`

The static website is stored here. It contains HTML pages, JavaScript, CSS, JSON data, and small audio files.

Expected content includes:

```text
frontend/
├── index.html
├── kids_menu.html
├── dictation_practice.html
├── grammar.html
├── vocab.html
├── ai_teacher.html
├── css/
├── js/
├── data/
└── tts/
```

Notes:

- Student-facing pages should continue to work as static files as much as possible.
- Learning content should mainly be stored in `frontend/data/` as JSON.
- Existing JSON formats must not be changed unless the related frontend code is updated at the same time.
- The current speech feature mainly uses browser speech synthesis. The small WAV files in `frontend/tts/` are not the main pronunciation method.

## `backend/`

Backend currently stores local tools and support files for content generation or maintenance.

Important rule:

```text
backend/config.json
```

must remain local only and must not be committed.

Use:

```text
backend/config.example.json
```

as the safe template.

## `deploy/`

Deployment-related files may be stored here. Generated packages such as zip files should not be committed.

## Future Direction

The long-term target is to make the student website depend on static JSON files rather than live API calls. Backend tools may remain useful for validation, conversion, and batch content generation, but API-dependent generation should be gradually removed or made optional.
