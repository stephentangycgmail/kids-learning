# Naming Standard

This standard defines future naming rules for lesson packages, files, IDs, and indexes.

Existing files must not be renamed by this standard.

## Core Rule

Names should be:

- Stable.
- Predictable.
- Sortable.
- Safe for URLs and GitHub Pages.
- Easy to read in file lists.

Use uppercase package IDs and lowercase file names.

## Package ID Format

Recommended simple format:

```text
P<grade-number>_U<two-digit-unit>
```

Examples:

```text
P3_U01
P4_U05
P5_U08
```

Recommended publisher format:

```text
<PUBLISHER>_P<grade-number>_U<two-digit-unit>
```

Examples:

```text
OXFORD_P4_U03
LONGMAN_P5_U08
```

## Folder Names

Package folder name must match `metadata.id`.

Examples:

```text
frontend/data/lessons/P4_U03/
frontend/data/lessons/OXFORD_P4_U03/
```

## File Names

Within a package, use lowercase activity names:

```text
metadata.json
vocabulary.json
grammar.json
reading.json
dictation.json
quiz.json
listening.json
```

Index file names:

```text
vocabulary_index.json
grammar_index.json
reading_index.json
dictation_index.json
quiz_index.json
```

## ID Rules

Stable item IDs should include package ID and item type.

Examples:

```text
P4_U03_vocab_001
P4_U03_grammar_001
P4_U03_dictation_001
OXFORD_P4_U03_quiz_001
```

Rules:

- Use lowercase type names in item IDs.
- Use three-digit sequence numbers.
- Do not reuse deleted IDs for different content.

## Language Suffixes

Use language fields inside JSON instead of language suffixes when possible.

Acceptable language field names:

- `language`
- `languages`
- `text_en`
- `text_zh`
- `zh_Hant`
- `zh_Hans`

Avoid creating duplicate files such as:

```text
vocabulary_en.json
vocabulary_zh.json
```

unless a future milestone explicitly approves that structure.

## Never Rename Existing Files

Current files such as these must remain stable until a migration task explicitly approves changes:

```text
dictation01.json
dictation02.json
cn_dictation01.json
cn_dictation02.json
tenses_present_simple.json
tenses_present_continuous.json
tenses_past_simple.json
vocab.json
vocab_ai.json
```

New naming standards apply to future lesson packages only.
