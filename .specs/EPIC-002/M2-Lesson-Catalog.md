# EPIC-002-M2 Lesson Catalog

## Objective

Create a static lesson catalog for Dictation Practice so the page discovers available dictation JSON files from data instead of hard-coded page code.

## Scope

Files introduced:

- `frontend/data/catalog.json`

Runtime file updated:

- `frontend/dictation_practice.html`

## Catalog Location

```text
frontend/data/catalog.json
```

## Catalog Shape

```json
{
  "dictation": [
    {
      "id": "dictation01",
      "title": "Dictation 01",
      "file": "dictation01.json",
      "level": "Primary 3",
      "topic": "Health"
    }
  ]
}
```

## Rules

- `dictation` must be an array.
- Each item must include `id`, `title`, `file`, `level`, and `topic`.
- `file` must be relative to `frontend/data/`.
- Existing dictation JSON schemas must remain unchanged.
- GitHub Pages relative paths must remain valid.

## Acceptance Criteria

- Dictation selector loads from `frontend/data/catalog.json`.
- `dictation01.json` and `dictation02.json` still load correctly.
- Playback, highlight, vocabulary popup, show/hide, speed, pause, and reading mode behavior remain unchanged.
- If the catalog cannot be loaded, the page shows a clear catalog loading error.
