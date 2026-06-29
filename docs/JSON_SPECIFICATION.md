# JSON Specification

This document is a placeholder for recording the JSON formats used by the existing website.

The current rule is: do not change existing JSON structures until the related frontend code is reviewed.

## Current JSON Location

Most learning data should be stored under:

```text
frontend/data/
```

## Documentation Goal

For each JSON file type, this document should eventually record:

- File name pattern.
- Purpose.
- Required fields.
- Optional fields.
- Example item.
- Which page or JavaScript file reads it.

## Initial Known Categories

The existing website may include JSON for:

- Dictation practice.
- Vocabulary.
- Grammar / tenses.
- AI teacher support data.
- Chinese explanations and word hints.

## Example Documentation Format

```markdown
## File: frontend/data/example.json

Purpose:

Used by:

Schema:

```json
{
  "field": "value"
}
```

Notes:
```

## Content Review Checklist

Before committing new JSON content:

1. Confirm it is valid JSON.
2. Confirm the frontend page can load it.
3. Confirm Chinese explanations are readable.
4. Confirm English examples are suitable for a child learner.
5. Confirm no API keys or private data are included.
