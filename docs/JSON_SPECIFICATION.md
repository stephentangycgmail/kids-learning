# JSON Specification

This document defines common JSON principles for future Kids Learning content.

Existing flat JSON files in `frontend/data/` remain valid and must not be changed by this standard. Future Lesson Packages should follow these rules.

## Current JSON Location

Current content lives under:

```text
frontend/data/
```

Future lesson packages should use:

```text
frontend/data/lessons/<PACKAGE_ID>/
```

after a dedicated implementation milestone.

## Common Principles

1. JSON must parse successfully.
2. Use UTF-8 encoding.
3. Use stable IDs for package items.
4. Keep arrays ordered for display order.
5. Prefer additive optional fields for future compatibility.
6. Do not include secrets, private data, or API keys.
7. Preserve existing schemas unless a migration is explicitly approved.

## Required Fields

For future package activity items, recommended required fields are:

- `id`: stable item ID.
- `type`: activity item type.
- `order`: display or practice order.
- `version`: semantic version, when the item may evolve independently.

Package metadata required fields are defined in [METADATA_STANDARD.md](METADATA_STANDARD.md).

Activity files may define additional required fields, such as:

- Vocabulary item: `word`.
- Dictation item: `text` or `sentence`.
- Grammar item: `pattern` or `english`.
- Quiz item: `question`, `answer`.

## Optional Fields

Common optional fields:

- `notes`
- `tags`
- `difficulty`
- `source`
- `language`
- `languages`
- `text_en`
- `text_zh`
- `example_en`
- `example_zh`
- `audio`
- `review_status`

Optional fields should not break older consumers if ignored.

## Version Field

Use semantic versioning:

```json
{
  "version": "1.0.0"
}
```

Rules:

- Future packages require `metadata.version`.
- Indexes require `version`.
- Activity files may include `version`.
- Existing flat files do not need version fields until a migration milestone.

See [VERSIONING.md](VERSIONING.md).

## ID Format

Recommended item ID format:

```text
<PACKAGE_ID>_<type>_<sequence>
```

Examples:

```text
P4_U03_vocab_001
P4_U03_grammar_001
P4_U03_dictation_001
```

Rules:

- Package IDs use uppercase letters, numbers, and underscores.
- Item type uses lowercase.
- Sequence uses three digits.
- IDs are stable after publish.

See [NAMING_STANDARD.md](NAMING_STANDARD.md).

## Language Fields

Recommended language codes:

- `en`
- `zh-Hant`
- `zh-Hans`

Recommended field patterns:

```json
{
  "language": "en",
  "languages": ["en", "zh-Hant"],
  "text_en": "I eat breakfast.",
  "text_zh": "我吃早餐。"
}
```

Rules:

- Use explicit language fields when an item contains multiple languages.
- Avoid mixing unrelated language content in one field.
- Keep existing fields such as `cn` and `chinese` unchanged in legacy files.

## Ordering Rules

Use array order as the primary display order.

When stable ordering is needed across tools, include:

```json
{
  "order": 1
}
```

Rules:

- `order` should be numeric.
- Do not rely on object key order for student-facing sequence.
- Indexes should sort by grade, publisher, unit, then package ID.

## Future Compatibility

Future-compatible JSON should:

- Allow unknown optional fields.
- Avoid deleting required fields.
- Add new fields instead of changing meanings.
- Keep IDs stable.
- Increment versions when content changes.

## Existing Flat File Shapes

Current files use these shapes:

- `dictation*.json`: object with `sentences[]`, each item has `full` and `cn`.
- `cn_dictation*.json`: object with `sentences[]`, each item has `text`.
- `tenses_*.json`: array of items with `english`, `chinese`, `reason_cn`, and `time_keywords`.
- `vocab.json`: object keyed by word.
- `vocab_ai.json`: object keyed by lowercase word.
- `sentences.json`: object with `sentences[]`.

These are current runtime formats and should not be modified by standards-only work.

## Content Review Checklist

Before committing new JSON content:

1. Confirm it is valid JSON.
2. Confirm required fields exist.
3. Confirm IDs and file names follow standards.
4. Confirm Chinese explanations are readable.
5. Confirm English examples are suitable for a child learner.
6. Confirm no API keys or private data are included.
7. Confirm GitHub Pages can load the content without backend APIs.
