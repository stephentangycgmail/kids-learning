# Codex Task 003 - Content Architecture

## Goal

Complete Sprint 3 by preparing the website for JSON-driven learning content packages.

This task should not add new teaching content yet. It should create the structure, standards, and index files that will allow future content to be added by Codex automatically.

## Hard Rules

- Do not redesign the UI.
- Do not change existing working behavior.
- Do not remove existing JSON files.
- Do not add new教材 yet.
- Do not re-enable API usage.
- Do not add secrets or config files.
- Keep GitHub Pages working.

## Required Files

Create or update the following documentation:

```text
docs/FOLDER_STRUCTURE.md
docs/DEVELOPMENT_GUIDE.md
docs/ROADMAP.md
docs/RELEASE_NOTES.md
```

Create index files under `frontend/data/`:

```text
frontend/data/dictation_index.json
frontend/data/grammar_index.json
frontend/data/vocabulary_index.json
frontend/data/reading_index.json
frontend/data/quiz_index.json
```

## Index File Rules

Each index file should be valid JSON and use this structure:

```json
{
  "version": "1.0",
  "type": "dictation",
  "items": []
}
```

For existing content, include current files if safe:

- `dictation01.json`
- `dictation02.json`
- `cn_dictation01.json`
- `cn_dictation02.json`
- `tenses_present_simple.json`
- `tenses_present_continuous.json`
- `tenses_past_simple.json`
- `vocab.json`
- `vocab_ai.json`

Do not move files yet unless all affected code is updated and tested.

## Metadata Standard

Use this metadata shape in future content:

```json
{
  "id": "P3_U01_DICTATION",
  "title": "Primary 3 Unit 1 Dictation",
  "grade": "P3",
  "unit": 1,
  "topic": "General",
  "language": "English",
  "difficulty": 1,
  "file": "dictation01.json"
}
```

## Validation

After changes:

1. JSON files must be valid.
2. Existing website must still load.
3. No new 404 should appear.
4. No frontend API dependency should be introduced.
5. GitHub Pages behavior should remain unchanged.

## Commit Message

```text
Sprint 3 - Add content architecture foundation
```
