# Content Standard

This document records the current JSON structures in `frontend/data/` after the v1.0.0 release and defines compatibility rules for future lesson content.

Existing published JSON files must remain backward compatible unless a migration is explicitly approved.

## General Rules

- Store reviewed student-facing content in `frontend/data/`.
- Use UTF-8 JSON with two-space indentation.
- Keep relative paths compatible with GitHub Pages.
- Validate JSON after every content change.
- Do not rename or delete lesson files without a migration plan.
- Update the relevant catalog when adding, removing, or renaming catalog-driven lesson files.
- Prefer optional new fields over breaking schema changes.

## Catalogs

### English Dictation Catalog

File: `frontend/data/catalog.json`

Shape:

```json
{
  "dictation": [
    {
      "id": "dictation01",
      "title": "Dictation 01",
      "file": "dictation01.json",
      "level": "",
      "topic": "",
      "order": 1
    }
  ]
}
```

Rules:

- `file` is relative to `frontend/data/`.
- `id` should be stable and URL-safe.
- `order` controls display order.
- Dictation Practice falls back to a clear error if the catalog cannot load.

### Grammar Lesson Catalog

File: `frontend/data/grammar_catalog.json`

Shape:

```json
{
  "lessons": [
    {
      "category": "tenses",
      "id": "present-simple",
      "title": "Present Simple",
      "file": "grammar_present_simple_lesson.json"
    }
  ]
}
```

Rules:

- `id` is used for lesson navigation and deep links.
- `file` is relative to `frontend/data/`.
- Catalog order controls lesson tab and previous/next order.
- New Grammar lessons should require one lesson JSON file plus one catalog entry.
- Do not create duplicate visible lesson titles.

## Vocabulary

### `vocab.json`

Current structure: root object keyed by vocabulary term.

Each entry contains:

- `word`
- `pos`
- `meaning_zh`
- `example_en`
- `example_zh`

### `vocab_ai.json`

Current structure: root object keyed by normalized vocabulary term.

Each entry contains:

- `cn`
- `usage`
- `tenses`

Compatibility:

- Keep existing root-key lookup behavior.
- Add new words as additional root keys.
- Do not replace the object format with an array unless the consuming page is migrated.

## Dictation

### English Dictation Files

Files: `dictation*.json`

Shape:

```json
{
  "sentences": [
    {
      "full": "This is an English sentence.",
      "cn": "Traditional Chinese translation."
    }
  ]
}
```

Rules:

- `sentences` must be an array.
- `full` is the English sentence used for display and speech.
- `cn` is the Traditional Chinese translation.
- Existing playback behavior depends on tokenizing `full`; keep sentences simple and review punctuation.

### Chinese Dictation Files

Files: `cn_dictation*.json`

Shape:

```json
{
  "sentences": [
    {
      "text": "中文句子"
    }
  ]
}
```

Rules:

- `sentences` must be an array.
- `text` is the sentence used for display and speech.
- Keep current file names stable unless a catalog migration is approved.

## Grammar Gold Lessons

Current catalog-driven Grammar lesson files use one object per lesson.

Required top-level fields:

- `id`
- `title`
- `level`
- `explanation_en`
- `explanation_zh`
- `structure`
- `spelling_rules`
- `signal_words`
- `common_mistakes`
- `keywords`
- `examples`
- `practice`
- `answer_key`

Optional top-level fields:

- `optional_extension`
- `quiz`

Gold Lesson expectations:

- 30 example sentences.
- 20 practice questions.
- 20 answer entries aligned by `id`.
- Optional 5-question multiple-choice quiz.
- British English.
- Traditional Chinese explanations or translations where present.
- Daily-life vocabulary suitable for Hong Kong Primary 4 unless a lesson states otherwise.

Example item shapes:

```json
{
  "english": "She is reading a book now.",
  "chinese": "她現在正在看書。",
  "reason_cn": "句子用 now 表示現在正在發生的動作。",
  "time_keywords": ["now"]
}
```

```json
{
  "id": 1,
  "type": "fill_blank",
  "question": "She ___ (read) a book now."
}
```

```json
{
  "id": 1,
  "question": "She ___ reading now.",
  "options": ["is", "are", "am"],
  "answer": "is"
}
```

Compatibility:

- Keep `examples`, `practice`, `answer_key`, and `quiz` arrays stable.
- Quiz rendering is optional; lessons without `quiz` remain valid.
- Do not modify `grammar.html` for content-only lesson additions unless the schema changes.

## Legacy Grammar/Tenses Data

Files: `tenses_*.json`

Current structure: root array of examples containing:

- `english`
- `chinese`
- `reason_cn`
- `time_keywords`

These files are legacy/reference data. Do not remove them unless the consuming behavior and documentation are reviewed.

## English Grammar Practice

English Grammar Practice is a separate static practice module.

Files:

- `grammar_practice_manifest.json`
- `grammar_practice_short_long.json`
- `grammar_practice_rearrangement.json`

Manifest fields include:

- `schemaVersion`
- `defaultSeed`
- `sessionQuestionCount`
- `mixedTypeCount`
- `pronounRules`
- `banks`
- `topics`

Question bank rules:

- Question banks must remain committed static JSON.
- Current total is 630 questions: 315 short/long and 315 rearrangement.
- Validate generated or edited banks with `tools/validate_grammar_practice_questions.py`.
- Do not generate questions at runtime in the browser.
- Browser history is stored locally with IndexedDB and a localStorage fallback; it is not part of committed content.

## Future Lesson Schema Direction

Future new lesson families may use a common object envelope when a migration is approved:

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
      "keywords": []
    }
  ]
}
```

This is a future direction, not a required migration for existing files.

