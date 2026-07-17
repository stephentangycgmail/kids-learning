#!/usr/bin/env python3
"""Validate the offline English Grammar Practice question banks."""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "frontend" / "data"
SHORT_PATH = DATA_DIR / "grammar_practice_short_long.json"
REARRANGEMENT_PATH = DATA_DIR / "grammar_practice_rearrangement.json"
MANIFEST_PATH = DATA_DIR / "grammar_practice_manifest.json"

CATEGORIES = {
    "present_verb_to_be", "past_verb_to_be", "present_simple",
    "past_simple", "present_continuous", "past_continuous", "can_cannot",
}
DIFFICULTIES = {"easy", "standard", "challenging"}
SECTION_IDS = {"short_yes", "short_no", "long_yes", "long_no"}
PRONOUNS = {"he", "she", "they", "it", "I", "you"}
EXPECTED_PRONOUNS = {
    "Peter": "he", "Tom": "he", "your uncle": "he", "your father": "he", "your brother": "he",
    "Lisa": "she", "Mary": "she", "your aunt": "she", "your mother": "she", "your sister": "she",
    "Peter and Lisa": "they", "your parents": "they", "the children": "they",
    "the dog": "it", "the cat": "it", "the book": "it", "the computer": "it", "you": "I", "I": "you",
}
BANNED_COMBINATIONS = (
    "the dog work in the office", "the cat work in the office",
    "the dog study english", "the cat study english",
)
MINIMUM_PER_TYPE = 300
MINIMUM_PER_CATEGORY = 20


def join_tokens(tokens: list[str]) -> str:
    sentence = ""
    for token in tokens:
        if token in {"?", ".", ",", "!"}:
            sentence += token
        elif sentence:
            sentence += " " + token
        else:
            sentence = token
    return sentence


def load_json(path: Path, errors: list[str]) -> dict:
    try:
        with path.open(encoding="utf-8") as handle:
            value = json.load(handle)
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"{path.relative_to(ROOT)}: {exc}")
        return {}
    if not isinstance(value, dict):
        errors.append(f"{path.relative_to(ROOT)}: root must be an object")
        return {}
    return value


def require_text(value: object, location: str, errors: list[str]) -> bool:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{location}: value must be a non-empty string")
        return False
    return True


def render_section(section: dict, location: str, errors: list[str]) -> str:
    blanks = {}
    for item in section.get("blanks", []):
        if isinstance(item, dict) and isinstance(item.get("id"), str):
            blanks[item["id"]] = item
    rendered = []
    for segment in section.get("segments", []):
        if not isinstance(segment, dict):
            errors.append(f"{location}: segment must be an object")
            continue
        if "text" in segment:
            rendered.append(str(segment["text"]))
        elif segment.get("blankId") in blanks:
            rendered.append(str(blanks[segment["blankId"]].get("correct", "")))
        else:
            errors.append(f"{location}: segment references a missing blank")
    return "".join(rendered)


def validate_short(question: dict, location: str, errors: list[str], warnings: list[str]) -> None:
    for field in ("questionText", "subjectText", "expectedPronoun", "explanation", "nearDuplicateKey"):
        require_text(question.get(field), f"{location}.{field}", errors)
    if question.get("expectedPronoun") not in PRONOUNS:
        errors.append(f"{location}: invalid expectedPronoun")
    expected = EXPECTED_PRONOUNS.get(question.get("subjectText"))
    if expected and question.get("expectedPronoun") != expected:
        errors.append(f"{location}: subject-to-pronoun metadata is inconsistent")
    question_text = str(question.get("questionText", ""))
    if question_text and not question_text[0].isupper():
        errors.append(f"{location}: question must begin with a capital letter")
    if any(pattern in question_text.lower() for pattern in BANNED_COMBINATIONS):
        errors.append(f"{location}: banned unnatural subject-action combination")

    sections = question.get("sections")
    if not isinstance(sections, list) or {item.get("id") for item in sections if isinstance(item, dict)} != SECTION_IDS:
        errors.append(f"{location}: exactly four required answer sections must exist")
        return

    completed = question.get("completedAnswers")
    if not isinstance(completed, dict) or set(completed) != SECTION_IDS:
        errors.append(f"{location}: completedAnswers must include all four sections")
        completed = {}

    for section in sections:
        section_id = section.get("id", "unknown")
        section_location = f"{location}.sections.{section_id}"
        blanks = section.get("blanks")
        if not isinstance(blanks, list) or not blanks:
            errors.append(f"{section_location}: blanks must be a non-empty array")
            continue
        blank_ids = []
        for item in blanks:
            if not isinstance(item, dict):
                errors.append(f"{section_location}: blank must be an object")
                continue
            blank_id = item.get("id")
            blank_ids.append(blank_id)
            correct = item.get("correct")
            options = item.get("options")
            require_text(blank_id, f"{section_location}.blank.id", errors)
            require_text(correct, f"{section_location}.{blank_id}.correct", errors)
            if not isinstance(options, list) or len(options) < 2:
                errors.append(f"{section_location}.{blank_id}: options must contain at least two values")
                continue
            if any(not isinstance(option, str) or not option for option in options):
                errors.append(f"{section_location}.{blank_id}: options contain an empty value")
            if len(options) != len(set(options)):
                errors.append(f"{section_location}.{blank_id}: duplicate options")
            if options.count(correct) != 1:
                errors.append(f"{section_location}.{blank_id}: correct answer must appear exactly once")
        if len(blank_ids) != len(set(blank_ids)):
            errors.append(f"{section_location}: duplicate blank IDs")
        rendered = render_section(section, section_location, errors)
        if rendered != section.get("correctAnswer") or rendered != completed.get(section_id):
            errors.append(f"{section_location}: completed answer does not match rendered blanks")

    long_no = next(item for item in sections if item.get("id") == "long_no")
    long_no_blanks = {item.get("id"): item.get("correct") for item in long_no.get("blanks", [])}
    if long_no_blanks.get("ln_aux") in {"don't", "doesn't", "didn't"}:
        if long_no_blanks.get("ln_verb") != question.get("baseVerb"):
            errors.append(f"{location}: doesn't/didn't must be followed by the stored base verb")
    elif "ln_verb" in long_no_blanks:
        errors.append(f"{location}: be and modal negative answers must not repeat an auxiliary verb")
    for answer in completed.values():
        if re.search(r"\b(?:isn't is|aren't are|wasn't was|weren't were|can't can)\b", str(answer), re.IGNORECASE):
            errors.append(f"{location}: malformed repeated auxiliary in completed answer")
    if question.get("category") == "present_simple":
        long_yes = next(item for item in sections if item.get("id") == "long_yes")
        long_yes_values = {item.get("id"): item.get("correct") for item in long_yes.get("blanks", [])}
        positive_verb = long_yes_values.get("ly_verb")
        base_verb = question.get("baseVerb")
        if question.get("expectedPronoun") in {"he", "she", "it"} and positive_verb == base_verb:
            errors.append(f"{location}: third-person present positive verb must be inflected")
        if question.get("expectedPronoun") in {"they", "I", "you"} and positive_verb != base_verb:
            errors.append(f"{location}: non-third-person present positive verb must use the base form")


def validate_rearrangement(question: dict, location: str, errors: list[str], warnings: list[str]) -> None:
    for field in ("correctSentence", "explanation", "nearDuplicateKey"):
        require_text(question.get(field), f"{location}.{field}", errors)
    tokens = question.get("tokens")
    if not isinstance(tokens, list) or len(tokens) < 3:
        errors.append(f"{location}: tokens must contain at least three items")
        return
    token_ids = []
    token_texts = []
    for token in tokens:
        if not isinstance(token, dict):
            errors.append(f"{location}: token must be an object")
            continue
        token_ids.append(token.get("id"))
        token_texts.append(token.get("text"))
        require_text(token.get("id"), f"{location}.token.id", errors)
        require_text(token.get("text"), f"{location}.token.text", errors)
    if len(token_ids) != len(set(token_ids)):
        errors.append(f"{location}: token instance IDs must be unique")
    if join_tokens(token_texts) != question.get("correctSentence"):
        errors.append(f"{location}: tokens do not reconstruct correctSentence")
    sentence = str(question.get("correctSentence", ""))
    if re.search(r"\s+[?.!,]", sentence):
        errors.append(f"{location}: invalid punctuation spacing")
    if sentence and not sentence[0].isupper():
        errors.append(f"{location}: sentence must begin with a capital letter")
    if any(pattern in sentence.lower() for pattern in BANNED_COMBINATIONS):
        errors.append(f"{location}: banned unnatural subject-action combination")


def validate_bank(bank: dict, expected_type: str, errors: list[str], warnings: list[str]) -> list[dict]:
    if bank.get("schemaVersion") != "1.0.0":
        errors.append(f"{expected_type}: unsupported schemaVersion")
    if bank.get("bankType") != expected_type:
        errors.append(f"{expected_type}: bankType mismatch")
    questions = bank.get("questions")
    if not isinstance(questions, list):
        errors.append(f"{expected_type}: questions must be an array")
        return []
    if len(questions) < MINIMUM_PER_TYPE:
        errors.append(f"{expected_type}: requires at least {MINIMUM_PER_TYPE} questions")

    for index, question in enumerate(questions):
        location = f"{expected_type}[{index}]"
        if not isinstance(question, dict):
            errors.append(f"{location}: question must be an object")
            continue
        for field in ("id", "type", "category", "topic", "difficulty"):
            require_text(question.get(field), f"{location}.{field}", errors)
        if question.get("type") != expected_type:
            errors.append(f"{location}: type mismatch")
        if question.get("category") not in CATEGORIES:
            errors.append(f"{location}: invalid category")
        if question.get("topic") != question.get("category"):
            errors.append(f"{location}: topic must match category")
        if question.get("difficulty") not in DIFFICULTIES:
            errors.append(f"{location}: invalid difficulty")
        if expected_type == "short_long":
            validate_short(question, location, errors, warnings)
        else:
            validate_rearrangement(question, location, errors, warnings)
    return questions


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    short_bank = load_json(SHORT_PATH, errors)
    rearrangement_bank = load_json(REARRANGEMENT_PATH, errors)
    manifest = load_json(MANIFEST_PATH, errors)
    short_questions = validate_bank(short_bank, "short_long", errors, warnings)
    rearrangement_questions = validate_bank(rearrangement_bank, "rearrangement", errors, warnings)
    all_questions = short_questions + rearrangement_questions

    ids = [item.get("id") for item in all_questions if isinstance(item, dict)]
    duplicate_ids = [key for key, count in Counter(ids).items() if count > 1]
    if duplicate_ids:
        errors.append(f"duplicate question IDs: {', '.join(sorted(duplicate_ids))}")

    short_texts = [item.get("questionText") for item in short_questions]
    rearrangement_texts = [item.get("correctSentence") for item in rearrangement_questions]
    duplicate_short = [key for key, count in Counter(short_texts).items() if count > 1]
    duplicate_rearrangement = [key for key, count in Counter(rearrangement_texts).items() if count > 1]
    if duplicate_short:
        errors.append(f"duplicate Short & Long question text count: {len(duplicate_short)}")
    if duplicate_rearrangement:
        errors.append(f"duplicate rearrangement sentence count: {len(duplicate_rearrangement)}")

    for bank_name, questions in (("short_long", short_questions), ("rearrangement", rearrangement_questions)):
        category_counts = Counter(item.get("category") for item in questions)
        for category in CATEGORIES:
            if category_counts[category] < MINIMUM_PER_CATEGORY:
                errors.append(f"{bank_name}.{category}: requires at least {MINIMUM_PER_CATEGORY} questions")

    if manifest.get("schemaVersion") != "1.0.0":
        errors.append("manifest: unsupported schemaVersion")
    if manifest.get("sessionQuestionCount") != 20 or manifest.get("mixedTypeCount") != 10:
        errors.append("manifest: session counts must be 20 and 10")
    expected_files = {
        "short_long": SHORT_PATH.name,
        "rearrangement": REARRANGEMENT_PATH.name,
    }
    if manifest.get("banks") != expected_files:
        errors.append("manifest: bank filenames do not match generated files")
    pronoun_rules = manifest.get("pronounRules")
    for subject, pronoun in EXPECTED_PRONOUNS.items():
        values = pronoun_rules.get(subject, []) if isinstance(pronoun_rules, dict) else []
        if pronoun not in values:
            errors.append(f"manifest: missing pronoun rule {subject} -> {pronoun}")
    if not isinstance(pronoun_rules, dict) or pronoun_rules.get("you") != ["I", "we"]:
        errors.append("manifest: you must explicitly support I or we response metadata")

    type_counts = Counter(item.get("type") for item in all_questions)
    category_counts = Counter(item.get("category") for item in all_questions)
    difficulty_counts = Counter(item.get("difficulty") for item in all_questions)
    print(f"Total questions: {len(all_questions)}")
    print("By type:")
    for key in sorted(type_counts):
        print(f"  {key}: {type_counts[key]}")
    print("By category:")
    for key in sorted(category_counts):
        print(f"  {key}: {category_counts[key]}")
    print("By difficulty:")
    for key in sorted(difficulty_counts):
        print(f"  {key}: {difficulty_counts[key]}")
    print(f"Duplicate count: {len(duplicate_ids) + len(duplicate_short) + len(duplicate_rearrangement)}")
    print(f"Error count: {len(errors)}")
    print(f"Warning count: {len(warnings)}")

    for warning in warnings:
        print(f"WARNING: {warning}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("Grammar Practice question banks are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
