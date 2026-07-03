# Lesson Package Standard

This standard defines the future unit of learning content for the Kids Learning Platform.

Existing flat files in `frontend/data/` are legacy/current content and must not be renamed by this standard. New content should gradually adopt Lesson Packages after a dedicated implementation milestone.

## Definition

A Lesson Package is a folder containing all reviewed learning materials for one textbook unit, topic, or teaching sequence.

Example:

```text
frontend/data/lessons/P4_U03/
+-- metadata.json
+-- vocabulary.json
+-- grammar.json
+-- reading.json
+-- dictation.json
+-- quiz.json
`-- listening.json
```

The package folder name is the package ID. See [NAMING_STANDARD.md](NAMING_STANDARD.md).

## Required File

### `metadata.json`

Purpose:

- Identifies the package.
- Describes grade, publisher, unit, topic, difficulty, and version.
- Allows indexes and future tools to discover and validate the package.

Required for every package.

Schema source:

- [METADATA_STANDARD.md](METADATA_STANDARD.md)

## Optional Activity Files

Activity files are optional because not every lesson needs every activity type. If an activity file exists, it must follow the common JSON rules in [JSON_SPECIFICATION.md](JSON_SPECIFICATION.md).

### `vocabulary.json`

Purpose:

- Stores target vocabulary for the lesson.
- May include word, part of speech, Chinese meaning, examples, pronunciation hints, and review tags.

Typical use:

- Vocabulary page.
- Dictation hint popup.
- Quiz generation.

### `grammar.json`

Purpose:

- Stores grammar targets, examples, explanations, and practice prompts.

Typical use:

- Grammar page.
- Quiz generation.
- Review lessons.

### `reading.json`

Purpose:

- Stores reading passage content, comprehension questions, vocabulary support, and answer keys.

Typical use:

- Future reading comprehension module.

### `dictation.json`

Purpose:

- Stores dictation sentences or passages for the lesson.
- May include English sentence text, Chinese support text, audio hints, and ordering.

Typical use:

- English dictation.
- Chinese dictation, if the package is Chinese-focused.

### `quiz.json`

Purpose:

- Stores reviewed quiz questions, choices, answer keys, and explanations.

Typical use:

- Quiz page.
- Review mode.

### `listening.json`

Purpose:

- Stores listening prompts, transcript text, comprehension questions, and optional local audio references.

Typical use:

- Future listening module.

## Package Rules

1. One package folder equals one lesson package.
2. The folder name must match `metadata.id`.
3. Every package must include `metadata.json`.
4. Activity files may be added only when content is reviewed.
5. Existing flat files must not be moved into packages without a migration milestone.
6. Package JSON must be valid and UTF-8 encoded.
7. Student-facing content should remain static and GitHub Pages compatible.

## Minimum Publishable Package

A package may be published with only:

```text
metadata.json
vocabulary.json
```

or:

```text
metadata.json
dictation.json
```

depending on the lesson goal.

## Future Compatibility

Packages may gain new optional files later, such as:

- `writing.json`
- `speaking.json`
- `review.json`
- `assets.json`

New files must be documented before use.
