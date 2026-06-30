#!/usr/bin/env python3
"""Generate the static Dictation Practice lesson catalog."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "frontend" / "data"
CATALOG_PATH = DATA_DIR / "catalog.json"
DICTATION_PATTERN = "dictation*.json"


def title_from_stem(stem: str) -> str:
    match = re.fullmatch(r"dictation(\d+)", stem)
    if match:
        return f"Dictation {match.group(1)}"
    words = re.sub(r"[_-]+", " ", stem).strip()
    return words.title() if words else stem


def validate_dictation_file(path: Path) -> None:
    try:
        with path.open("r", encoding="utf-8") as handle:
            data = json.load(handle)
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path}: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}") from exc

    if not isinstance(data, dict):
        raise ValueError(f"{path}: root value must be a JSON object")

    if "sentences" not in data:
        raise ValueError(f"{path}: missing required 'sentences' field")

    if not isinstance(data["sentences"], list):
        raise ValueError(f"{path}: 'sentences' must be an array")


def build_catalog() -> dict[str, list[dict[str, object]]]:
    files = sorted(DATA_DIR.glob(DICTATION_PATTERN), key=lambda item: item.name)
    files = [path for path in files if path.name != CATALOG_PATH.name]

    items: list[dict[str, object]] = []
    for order, path in enumerate(files, start=1):
        validate_dictation_file(path)
        items.append(
            {
                "id": path.stem,
                "title": title_from_stem(path.stem),
                "file": path.name,
                "level": "",
                "topic": "",
                "order": order,
            }
        )

    return {"dictation": items}


def main() -> int:
    try:
        catalog = build_catalog()
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        print(f"Catalog was not updated: {CATALOG_PATH}", file=sys.stderr)
        return 1

    output = json.dumps(catalog, ensure_ascii=False, indent=2) + "\n"
    CATALOG_PATH.write_text(output, encoding="utf-8")
    print(f"Wrote {CATALOG_PATH.relative_to(ROOT)} with {len(catalog['dictation'])} dictation item(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
