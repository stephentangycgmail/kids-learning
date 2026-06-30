# Catalog Generator

`tools/generate_catalog.py` regenerates the static Dictation Practice catalog from existing dictation JSON files.

## Purpose

Dictation Practice reads available lessons from:

```text
frontend/data/catalog.json
```

The generator prevents the catalog from being maintained by hand as new `dictation*.json` files are added.

## Input

The tool scans:

```text
frontend/data/dictation*.json
```

Each matching file must:

- parse as JSON;
- have a root JSON object;
- contain `sentences`;
- have `sentences` as an array.

The tool does not modify any dictation JSON files.

## Output

The tool rewrites:

```text
frontend/data/catalog.json
```

Output format:

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

Catalog ordering is stable and sorted by filename.

## Usage

From the repository root:

```powershell
python tools/generate_catalog.py
```

Expected success output:

```text
Wrote frontend\data\catalog.json with 2 dictation item(s).
```

## Failure Behavior

If any dictation file is invalid, the tool:

- prints a clear error;
- does not overwrite `frontend/data/catalog.json`;
- exits non-zero.

## Notes

- Uses only the Python standard library.
- Keeps GitHub Pages paths relative.
- Does not update `vocab_ai.json`, backend files, or frontend code.
