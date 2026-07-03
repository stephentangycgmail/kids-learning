# Metadata Standard

Every future Lesson Package must include `metadata.json`.

This standard applies to future packages. It does not require changes to existing flat JSON files in `frontend/data/`.

## Example

```json
{
  "id": "P4_U03",
  "grade": "P4",
  "publisher": "Oxford",
  "unit": 3,
  "topic": "",
  "difficulty": 2,
  "version": "1.0.0"
}
```

## Required Fields

### `id`

Stable package identifier.

Rules:

- Must match the package folder name.
- Use uppercase letters, numbers, and underscores.
- Examples: `P4_U03`, `OXFORD_P4_U03`.

### `grade`

Student grade or level.

Examples:

- `P3`
- `P4`
- `P5`

### `publisher`

Publisher, source, or curriculum family.

Examples:

- `Oxford`
- `Longman`
- `School`
- `Custom`

Use `Custom` when there is no textbook publisher.

### `unit`

Numeric unit number.

Rules:

- Use a number, not a string.
- Use `3`, not `"03"`.
- Folder naming may still use zero padding, such as `P4_U03`.

### `topic`

Short human-readable topic.

Examples:

- `Healthy Food`
- `Daily Routines`
- `Past Simple`

Use an empty string only when the topic has not been reviewed yet.

### `difficulty`

Relative difficulty level from `1` to `5`.

Suggested meaning:

- `1`: beginner or very supported.
- `2`: easy.
- `3`: standard.
- `4`: challenging.
- `5`: extension or advanced.

### `version`

Semantic version for the package.

Rules:

- Use `MAJOR.MINOR.PATCH`.
- Example: `1.0.0`.
- See [VERSIONING.md](VERSIONING.md).

## Optional Fields

Optional metadata may include:

```json
{
  "title": "Unit 3 Healthy Food",
  "language": "en",
  "languages": ["en", "zh-Hant"],
  "status": "draft",
  "created_at": "2026-06-30",
  "updated_at": "2026-06-30",
  "source": "textbook",
  "notes": ""
}
```

## Status Values

Recommended values:

- `draft`
- `reviewed`
- `published`
- `archived`
- `deprecated`

## Metadata Rules

1. `metadata.id` must be stable after publish.
2. Do not reuse an ID for a different lesson.
3. Do not change `grade`, `publisher`, or `unit` casually after publish.
4. Update `version` when package content changes.
5. Keep metadata child-safe and free of private notes.
