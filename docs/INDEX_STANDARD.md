# Index Standard

Indexes are future discovery files for Lesson Packages and activity modules.

This standard does not require current frontend code to use indexes yet. Existing flat JSON files remain valid until a migration milestone changes the runtime.

## Index File Names

Future index files should live near published lesson packages, for example:

```text
frontend/data/indexes/
+-- vocabulary_index.json
+-- grammar_index.json
+-- reading_index.json
+-- dictation_index.json
`-- quiz_index.json
```

## Purpose

Indexes answer two questions:

1. Which packages exist?
2. Which packages include a specific activity type?

## Common Index Shape

Each index should be an object with version and item list:

```json
{
  "version": "1.0.0",
  "type": "vocabulary",
  "items": [
    {
      "package_id": "P4_U03",
      "path": "../lessons/P4_U03/vocabulary.json",
      "metadata_path": "../lessons/P4_U03/metadata.json",
      "title": "Unit 3 Healthy Food",
      "grade": "P4",
      "publisher": "Oxford",
      "unit": 3,
      "status": "published",
      "version": "1.0.0"
    }
  ]
}
```

## Required Item Fields

- `package_id`: lesson package ID.
- `path`: relative path to the activity file.
- `metadata_path`: relative path to package metadata.
- `title`: display title for maintainers or future selectors.
- `grade`: grade or level.
- `publisher`: publisher or source family.
- `unit`: numeric unit.
- `status`: lifecycle status.
- `version`: activity or package version.

## Index Types

### `vocabulary_index.json`

Lists packages with `vocabulary.json`.

### `grammar_index.json`

Lists packages with `grammar.json`.

### `reading_index.json`

Lists packages with `reading.json`.

### `dictation_index.json`

Lists packages with `dictation.json`.

### `quiz_index.json`

Lists packages with `quiz.json`.

## Updating Indexes

When a package is published:

1. Validate package JSON.
2. Confirm `metadata.status` is `published`.
3. Add package entries to every relevant activity index.
4. Keep index item paths relative.
5. Sort items by `grade`, then `publisher`, then `unit`, then `package_id`.

When a package is archived or deprecated:

1. Keep the package entry if old content still needs discovery.
2. Update `status`.
3. Do not silently remove published content from indexes without a migration note.

## Discovery Rules

Future tools may discover packages by:

1. Reading activity indexes.
2. Reading a package registry, if one is added later.
3. Scanning `frontend/data/lessons/*/metadata.json`.

If both indexes and scanning exist, indexes should be treated as the published source of truth.
