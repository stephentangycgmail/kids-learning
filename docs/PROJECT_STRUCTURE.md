# Project Structure

This document records the current structure of the Kids Learning Website repository after the static GitHub Pages migration.

## Top Level

```text
kids-learning/
+-- frontend/
+-- backend/
+-- docs/
+-- Dockerfile
+-- .gitignore
+-- index.html
`-- README.md
```

## `frontend/`

The student-facing static website is stored here. It contains HTML pages, JavaScript, CSS, JSON data, and small audio files.

Expected content includes:

```text
frontend/
+-- index.html
+-- cn.html
+-- eng.html
+-- math.html
+-- dictation_practice.html
+-- cn_dictation.html
+-- grammar.html
+-- vocab.html
+-- ai_teacher.html
+-- sentences.html
+-- usage.html
+-- quiz.html
+-- css/
+-- js/
+-- data/
`-- tts/
```

Notes:

- Student-facing pages should work on GitHub Pages as static files.
- Learning content should mainly be stored in `frontend/data/` as JSON.
- Existing JSON formats must not be changed unless the related frontend code is updated at the same time.
- Speech features use browser speech synthesis. The small WAV files in `frontend/tts/` are not the main pronunciation method.
- Backend files are preserved as legacy/local-only tooling.

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

## Future Direction

The long-term target is to keep the student website dependent on static JSON files rather than live API calls. Backend tools may remain useful for validation, conversion, and batch content generation, but API-dependent generation should be optional and local-only.
