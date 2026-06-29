# Content Generation Plan

This project will gradually move away from live API-based content generation and towards reviewed static JSON content.

## Current Principle

Do not change the existing website behavior during the cleanup phase.

The current working system should remain:

```text
frontend pages
    ↓
read JSON files from frontend/data/
    ↓
render learning activities
```

## Target Principle

Future learning materials should be generated outside the live student website, then saved as JSON.

Recommended flow:

```text
ChatGPT / Codex creates or edits learning content
    ↓
JSON file is saved under frontend/data/
    ↓
User reviews the content
    ↓
Website reads the static JSON file
```

## Why This Direction

- Lower running cost.
- No API key is needed for students to use the website.
- GitHub can track every content change.
- Materials can be reviewed before the child uses them.
- The website can be hosted as a static site.

## Rules for New Content

1. Do not add new live API calls to student-facing pages unless specifically approved.
2. Prefer static JSON under `frontend/data/`.
3. Keep JSON formats consistent with the existing frontend code.
4. Add or update documentation when a JSON format changes.
5. Large batches of generated content should be reviewed before commit.

## Later Migration Tasks

These tasks are not part of the first cleanup phase:

- Identify all backend scripts that call Azure/OpenAI APIs.
- Separate useful non-API utilities from API-dependent scripts.
- Replace API generation with prompt-based Codex/ChatGPT JSON generation.
- Add JSON validation tools.
- Add content review checklists.
