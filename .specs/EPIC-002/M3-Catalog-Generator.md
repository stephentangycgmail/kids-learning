# EPIC-002-M3 Catalog Generator

## Objective

Create a tool that scans existing Dictation Practice JSON files and regenerates `frontend/data/catalog.json` automatically.

## Files

Created:

- `tools/generate_catalog.py`
- `docs/development/catalog-generator.md`
- `.specs/EPIC-002/M3-Catalog-Generator.md`

Generated:

- `frontend/data/catalog.json`

## Requirements

The generator must:

1. Scan `frontend/data/` for `dictation*.json`.
2. Sort matching files by filename for stable output.
3. Validate every matching file before writing:
   - file parses as JSON;
   - root is an object;
   - `sentences` exists;
   - `sentences` is an array.
4. Write UTF-8 JSON with two-space indentation.
5. Include `id`, `title`, `file`, `level`, `topic`, and `order` for every dictation item.
6. Leave existing dictation JSON files unchanged.
7. Avoid external Python packages.

## Catalog Shape

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

## Validation

Run:

```powershell
python tools/generate_catalog.py
```

Then inspect:

```powershell
git diff
```

Expected changed files:

- `tools/generate_catalog.py`
- `docs/development/catalog-generator.md`
- `.specs/EPIC-002/M3-Catalog-Generator.md`
- `frontend/data/catalog.json`

No frontend HTML, backend files, `dictation01.json`, `dictation02.json`, or `vocab_ai.json` should change.
