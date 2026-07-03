# Content Standard

## Purpose

This document records the current JSON structures in `frontend/data/` and defines a consistent schema for future lesson content. Existing files remain backward compatible and do not need to be renamed or migrated immediately.

## Current Structures

### Vocabulary

Two key-based object formats are currently used.

`vocab.json` uses the vocabulary term as the root key. Each entry contains:

- `word`: display term
- `pos`: part of speech
- `meaning_zh`: Chinese meaning
- `example_en`: English example
- `example_zh`: Chinese example translation

`vocab_ai.json` also uses a normalized term as the root key. Each entry contains:

- `cn`: Chinese meaning
- `usage`: usage example
- `tenses`: tense or word-form guidance

### Dictation

English dictation files use an object with a `sentences` array. Each sentence contains:

- `full`: English sentence
- `cn`: Chinese translation

Chinese dictation files also use an object with a `sentences` array, but each sentence contains only:

- `text`: sentence text

`catalog.json` exposes a `dictation` array. Each catalog entry contains:

- `id`
- `title`
- `file`
- `level`
- `topic`
- `order`

### Grammar

Grammar tense files use a root array. Each entry contains:

- `english`: English example sentence
- `chinese`: Chinese translation
- `reason_cn`: Chinese grammar explanation
- `time_keywords`: array of relevant time expressions

### Legacy and Auxiliary Data

- `sentences.json` follows the English dictation `sentences` structure.
- `Old/sentences_pos.json` is a legacy root array using `sentence` and `tokens`.
- Raw-output and import text files are source material rather than published JSON schemas.

## Recommended Future Schema

Future lesson files should use one common object envelope:

```json
{
  "schemaVersion": "1.0.0",
  "id": "P4_U03_DICTATION",
  "type": "dictation",
  "title": "Unit 3 Dictation",
  "level": "P4",
  "topic": "Healthy Food",
  "language": {
    "source": "en",
    "translation": "zh-Hant"
  },
  "items": [
    {
      "id": "item-001",
      "order": 1,
      "text": "Cola is bad for your health.",
      "translation": "可樂對你的健康不好。",
      "term": null,
      "partOfSpeech": null,
      "example": null,
      "explanation": null,
      "keywords": []
    }
  ]
}
```

## Common Fields

- `schemaVersion`: semantic version of the JSON contract
- `id`: stable, unique lesson identifier
- `type`: `vocabulary`, `dictation`, or `grammar`
- `title`: human-readable lesson title
- `level`: curriculum or grade level
- `topic`: lesson topic
- `language.source`: source-content language code
- `language.translation`: translation language code
- `items`: ordered lesson-content array

Every item should include `id`, `order`, `text`, and `translation`. Type-specific fields may be `null` or empty when they do not apply:

- Vocabulary: `term`, `partOfSpeech`, `example`
- Dictation: `text`, `translation`
- Grammar: `text`, `translation`, `explanation`, `keywords`

## Compatibility Rules

- Do not rename or restructure existing published JSON files without a migration plan.
- New consumers should select parsing behavior using `schemaVersion` and `type`.
- Item order must be explicit and stable.
- IDs must remain stable across wording corrections.
- Save JSON as UTF-8 with two-space indentation.
- Add new optional fields without breaking older consumers.
