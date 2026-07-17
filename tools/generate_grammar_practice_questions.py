#!/usr/bin/env python3
"""Generate the offline English Grammar Practice question banks."""

from __future__ import annotations

import argparse
import json
import random
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "frontend" / "data"
DEFAULT_SEED = 20260716

CATEGORIES = [
    "present_verb_to_be",
    "past_verb_to_be",
    "present_simple",
    "past_simple",
    "present_continuous",
    "past_continuous",
    "can_cannot",
]

CATEGORY_LABELS = {
    "present_verb_to_be": "Present Verb to Be: am / is / are",
    "past_verb_to_be": "Past Verb to Be: was / were",
    "present_simple": "Present Simple: do / does",
    "past_simple": "Past Simple: did",
    "present_continuous": "Present Continuous",
    "past_continuous": "Past Continuous",
    "can_cannot": "Can / Cannot",
}

DIFFICULTIES = ("easy", "standard", "challenging")


def action(base: str, third: str, past: str, ing: str, rest: str) -> dict[str, str]:
    return {"base": base, "third": third, "past": past, "ing": ing, "rest": rest}


ACTORS = [
    ("Peter", "he", "singular", [
        action("read", "reads", "read", "reading", "a storybook"),
        action("play", "plays", "played", "playing", "football after school"),
        action("walk", "walks", "walked", "walking", "to school"),
    ]),
    ("Lisa", "she", "singular", [
        action("study", "studies", "studied", "studying", "English after school"),
        action("help", "helps", "helped", "helping", "her mother at home"),
        action("draw", "draws", "drew", "drawing", "a picture"),
    ]),
    ("Tom", "he", "singular", [
        action("ride", "rides", "rode", "riding", "his bicycle in the park"),
        action("wash", "washes", "washed", "washing", "his hands before lunch"),
        action("visit", "visits", "visited", "visiting", "the library"),
    ]),
    ("Mary", "she", "singular", [
        action("sing", "sings", "sang", "singing", "a song"),
        action("carry", "carries", "carried", "carrying", "her school bag"),
        action("make", "makes", "made", "making", "a sandwich"),
    ]),
    ("your uncle", "he", "singular", [
        action("work", "works", "worked", "working", "in the office"),
        action("drive", "drives", "drove", "driving", "to work"),
        action("read", "reads", "read", "reading", "the newspaper"),
    ]),
    ("your mother", "she", "singular", [
        action("cook", "cooks", "cooked", "cooking", "dinner in the kitchen"),
        action("shop", "shops", "shopped", "shopping", "at the market"),
        action("clean", "cleans", "cleaned", "cleaning", "the kitchen"),
    ]),
    ("your brother", "he", "singular", [
        action("play", "plays", "played", "playing", "basketball at school"),
        action("do", "does", "did", "doing", "his homework"),
        action("watch", "watches", "watched", "watching", "a cartoon"),
    ]),
    ("your sister", "she", "singular", [
        action("practise", "practises", "practised", "practising", "the piano"),
        action("feed", "feeds", "fed", "feeding", "the cat"),
        action("pack", "packs", "packed", "packing", "her school bag"),
    ]),
    ("Peter and Lisa", "they", "plural", [
        action("play", "play", "played", "playing", "in the park"),
        action("study", "study", "studied", "studying", "together after school"),
        action("take", "take", "took", "taking", "the bus to school"),
    ]),
    ("your parents", "they", "plural", [
        action("eat", "eat", "ate", "eating", "breakfast together"),
        action("watch", "watch", "watched", "watching", "television at night"),
        action("walk", "walk", "walked", "walking", "in the park"),
    ]),
    ("the children", "they", "plural", [
        action("line up", "line up", "lined up", "lining up", "at school"),
        action("read", "read", "read", "reading", "storybooks in class"),
        action("play", "play", "played", "playing", "games at recess"),
    ]),
    ("the dog", "it", "singular", [
        action("sleep", "sleeps", "slept", "sleeping", "under the table"),
        action("run", "runs", "ran", "running", "in the park"),
        action("eat", "eats", "ate", "eating", "its food"),
    ]),
    ("the cat", "it", "singular", [
        action("sit", "sits", "sat", "sitting", "on the chair"),
        action("drink", "drinks", "drank", "drinking", "milk"),
        action("chase", "chases", "chased", "chasing", "a toy"),
    ]),
    ("you", "I", "second", [
        action("read", "read", "read", "reading", "after school"),
        action("help", "help", "helped", "helping", "at home"),
        action("play", "play", "played", "playing", "chess with Tom"),
    ]),
    ("I", "you", "first", [
        action("bring", "bring", "brought", "bringing", "my lunch to school"),
        action("finish", "finish", "finished", "finishing", "my homework"),
        action("tidy", "tidy", "tidied", "tidying", "my desk"),
    ]),
]

BE_COMPLEMENTS = [
    ("at school", "in the classroom", "ready for class"),
    ("at home", "in the library", "happy today"),
    ("in the playground", "near the school gate", "ready for lunch"),
    ("at the bus stop", "in the music room", "busy today"),
    ("in the office", "at home", "free this afternoon"),
    ("in the kitchen", "at the market", "tired today"),
    ("at school", "in his bedroom", "ready for football"),
    ("in the music room", "at home", "happy today"),
    ("in the park", "at the library", "ready to go"),
    ("at home", "near the school", "busy today"),
    ("in the classroom", "in the playground", "quiet now"),
    ("under the table", "in the garden", "hungry now"),
    ("on the chair", "near the window", "sleepy now"),
    ("at school", "in the library", "ready to learn"),
    ("in the classroom", "at the bus stop", "early today"),
]

PHRASES = (
    "after school", "last night", "every day", "at seven o'clock",
    "in the office", "in the classroom", "in the playground",
    "at the bus stop", "at the market", "under the table",
    "on the chair", "in the park", "at school", "at home",
    "the school gate", "the music room", "the living room",
    "the dining table", "his school bag", "her school bag",
    "my school bag", "a storybook", "the newspaper", "his bicycle",
)


def difficulty(index: int) -> str:
    return DIFFICULTIES[index % len(DIFFICULTIES)]


def ordered_options(correct: str, distractors: list[str], rng: random.Random) -> list[str]:
    values = list(dict.fromkeys([correct, *distractors]))
    rng.shuffle(values)
    return values


def blank(blank_id: str, label: str, correct: str, distractors: list[str], rng: random.Random) -> dict:
    return {
        "id": blank_id,
        "label": label,
        "correct": correct,
        "options": ordered_options(correct, distractors, rng),
    }


def render_section(section: dict) -> str:
    blanks = {item["id"]: item for item in section["blanks"]}
    return "".join(
        segment["text"] if "text" in segment else blanks[segment["blankId"]]["correct"]
        for segment in section["segments"]
    )


def pronoun_options(pronoun: str) -> list[str]:
    pools = {
        "he": ["she", "they", "it"],
        "she": ["he", "they", "it"],
        "they": ["he", "she", "it"],
        "it": ["he", "she", "they"],
        "I": ["we", "you", "he"],
        "you": ["I", "we", "they"],
    }
    return pools[pronoun]


def make_sections(
    pronoun: str,
    yes_aux: str,
    no_aux: str,
    positive_verb: str,
    negative_aux: str,
    negative_verb: str | None,
    rest: str,
    rng: random.Random,
    auxiliary_distractors: list[str],
    verb_distractors: list[str],
) -> list[dict]:
    pronouns = pronoun_options(pronoun)
    long_no_segments = [
        {"text": "No, "}, {"blankId": "ln_pronoun"}, {"text": " "}, {"blankId": "ln_aux"},
    ]
    long_no_blanks = [
        blank("ln_pronoun", "pronoun", pronoun, pronouns, rng),
        blank("ln_aux", "negative auxiliary", negative_aux, auxiliary_distractors, rng),
    ]
    if negative_verb:
        long_no_segments.extend([{"text": " "}, {"blankId": "ln_verb"}])
        long_no_blanks.append(blank("ln_verb", "verb form", negative_verb, verb_distractors, rng))
    long_no_segments.append({"text": f" {rest}."})

    section_specs = [
        (
            "short_yes", "Short Yes",
            [{"text": "Yes, "}, {"blankId": "sy_pronoun"}, {"text": " "}, {"blankId": "sy_aux"}, {"text": "."}],
            [blank("sy_pronoun", "pronoun", pronoun, pronouns, rng),
             blank("sy_aux", "auxiliary", yes_aux, auxiliary_distractors, rng)],
        ),
        (
            "short_no", "Short No",
            [{"text": "No, "}, {"blankId": "sn_pronoun"}, {"text": " "}, {"blankId": "sn_aux"}, {"text": "."}],
            [blank("sn_pronoun", "pronoun", pronoun, pronouns, rng),
             blank("sn_aux", "negative auxiliary", no_aux, auxiliary_distractors, rng)],
        ),
        (
            "long_yes", "Long Yes",
            [{"text": "Yes, "}, {"blankId": "ly_pronoun"}, {"text": " "}, {"blankId": "ly_verb"}, {"text": f" {rest}."}],
            [blank("ly_pronoun", "pronoun", pronoun, pronouns, rng),
             blank("ly_verb", "verb form", positive_verb, verb_distractors, rng)],
        ),
        (
            "long_no", "Long No",
            long_no_segments,
            long_no_blanks,
        ),
    ]
    sections = []
    for section_id, label, segments, blanks in section_specs:
        section = {"id": section_id, "label": label, "segments": segments, "blanks": blanks}
        section["correctAnswer"] = render_section(section)
        sections.append(section)
    return sections


def be_forms(subject_kind: str, pronoun: str, past: bool) -> tuple[str, str, str]:
    if past:
        question = "were" if subject_kind in {"plural", "second"} else "was"
        answer = "were" if pronoun in {"they", "you"} else "was"
        return question, answer, "weren't" if answer == "were" else "wasn't"
    question = {"plural": "are", "second": "are", "first": "am"}.get(subject_kind, "is")
    answer = {"they": "are", "I": "am", "you": "are"}.get(pronoun, "is")
    negative = {"are": "aren't", "am": "am not", "is": "isn't"}[answer]
    return question, answer, negative


def make_short_long_question(category: str, actor_index: int, action_index: int, rng: random.Random) -> dict:
    subject, pronoun, kind, actions = ACTORS[actor_index]
    act = actions[action_index]
    seq = actor_index * 3 + action_index + 1
    question_id = f"sla-{category.replace('_', '-')}-{seq:03d}"

    if category in {"present_verb_to_be", "past_verb_to_be"}:
        past = category == "past_verb_to_be"
        rest = BE_COMPLEMENTS[actor_index][action_index]
        if past:
            rest = f"{rest} yesterday"
        question_aux, answer_aux, negative_aux = be_forms(kind, pronoun, past)
        question_text = f"{question_aux.capitalize()} {subject} {rest}?"
        positive = answer_aux
        base = None
        aux_distractors = ["is", "are", "was", "were", "does"]
        verb_distractors = ["is", "are", "am", "was", "were"]
        explanation = (
            f"Use {answer_aux} with {pronoun}. Use {negative_aux} for the negative answer."
        )
    elif category == "present_simple":
        question_aux = "does" if kind == "singular" else "do"
        answer_aux = "does" if pronoun in {"he", "she", "it"} else "do"
        negative_aux = "doesn't" if answer_aux == "does" else "don't"
        question_text = f"{question_aux.capitalize()} {subject} {act['base']} {act['rest']}?"
        positive = act["third"] if answer_aux == "does" else act["base"]
        base = act["base"]
        rest = act["rest"].replace("my ", "your ") if subject == "I" else act["rest"]
        aux_distractors = ["do", "does", "is", "did", "don't", "doesn't"]
        verb_distractors = [act["base"], act["third"], act["past"], act["ing"]]
        explanation = (
            f"The question uses {question_aux}. In a positive answer with {pronoun}, use {positive}. "
            f"After {negative_aux}, use the base verb {base}."
        )
    elif category == "past_simple":
        question_text = f"Did {subject} {act['base']} {act['rest']} yesterday?"
        answer_aux, negative_aux = "did", "didn't"
        response_rest = act["rest"].replace("my ", "your ") if subject == "I" else act["rest"]
        positive, base, rest = act["past"], act["base"], f"{response_rest} yesterday"
        aux_distractors = ["did", "does", "was", "didn't", "doesn't"]
        verb_distractors = [act["base"], act["third"], act["past"], act["ing"]]
        explanation = (
            f"Use did in the short positive answer. Use {positive} in the long positive answer. "
            f"After didn't, use the base verb {base}."
        )
    elif category in {"present_continuous", "past_continuous"}:
        past = category == "past_continuous"
        question_aux, answer_aux, negative_aux = be_forms(kind, pronoun, past)
        time_text = "at seven o'clock yesterday" if past else "now"
        question_text = f"{question_aux.capitalize()} {subject} {act['ing']} {act['rest']} {time_text}?"
        response_rest = act["rest"].replace("my ", "your ") if subject == "I" else act["rest"]
        positive, base, rest = answer_aux, None, f"{act['ing']} {response_rest} {time_text}"
        aux_distractors = ["is", "are", "was", "were", "does", "did"]
        verb_distractors = [answer_aux, act["base"], act["past"], act["ing"]]
        explanation = (
            f"Use {answer_aux} with {pronoun}. The action uses the -ing form {act['ing']}."
        )
    else:
        question_text = f"Can {subject} {act['base']} {act['rest']}?"
        answer_aux, negative_aux = "can", "can't"
        response_rest = act["rest"].replace("my ", "your ") if subject == "I" else act["rest"]
        positive, base, rest = "can", None, f"{act['base']} {response_rest}"
        aux_distractors = ["can", "can't", "does", "is", "did"]
        verb_distractors = ["can", act["base"], act["third"], act["past"]]
        explanation = f"Use can with {pronoun}. After can't, use the base verb {act['base']}."

    sections = make_sections(
        pronoun, answer_aux, negative_aux, positive, negative_aux, base, rest,
        rng, aux_distractors, verb_distractors,
    )
    question = {
        "id": question_id,
        "type": "short_long",
        "category": category,
        "topic": category,
        "difficulty": difficulty(seq - 1),
        "questionText": question_text,
        "subjectText": subject,
        "expectedPronoun": pronoun,
        "responsePerspective": "explicit",
        "sections": sections,
        "completedAnswers": {section["id"]: section["correctAnswer"] for section in sections},
        "explanation": explanation,
        "nearDuplicateKey": f"{category}:{act['base']}:{act['rest']}",
    }
    if base:
        question["baseVerb"] = base
    return question


def phrase_tokenise(text: str) -> list[str]:
    remaining = text
    placeholders: dict[str, str] = {}
    for index, phrase in enumerate(sorted(PHRASES, key=len, reverse=True)):
        marker = f"__PHRASE_{index}__"
        if phrase in remaining:
            remaining = remaining.replace(phrase, marker)
            placeholders[marker] = phrase
    tokens = []
    for raw in remaining.split():
        punctuation = raw[-1] if raw.endswith(("?", ".", ",", "!")) else ""
        core = raw[:-1] if punctuation else raw
        tokens.append(placeholders.get(core, core))
        if punctuation:
            tokens.append(punctuation)
    return [token for token in tokens if token]


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


def make_rearrangement_question(category: str, actor_index: int, action_index: int) -> dict:
    subject, _pronoun, kind, actions = ACTORS[actor_index]
    act = actions[action_index]
    seq = actor_index * 3 + action_index + 1
    pattern = action_index
    tags: list[str] = []

    if category in {"present_verb_to_be", "past_verb_to_be"}:
        past = category == "past_verb_to_be"
        question_aux, _answer_aux, _negative_aux = be_forms(kind, _pronoun, past)
        complement = BE_COMPLEMENTS[actor_index][action_index]
        if pattern == 0:
            sentence = f"{question_aux.capitalize()} {subject} {complement}{' yesterday' if past else ' today'}?"
            hint = f"Use {question_aux.capitalize()} + subject + information."
        elif pattern == 1:
            sentence = f"Where {question_aux} {subject}{' yesterday' if past else ' now'}?"
            hint = f"Use Where + {question_aux} + subject."
            tags.append("wh_questions")
        else:
            sentence = f"{subject.capitalize()} {question_aux} {complement}{' yesterday' if past else ' today'}."
            hint = f"Use subject + {question_aux} + information."
    elif category == "present_simple":
        aux = "does" if kind == "singular" else "do"
        verb = act["third"] if kind == "singular" else act["base"]
        if pattern == 0:
            sentence = f"{aux.capitalize()} {subject} usually {act['base']} {act['rest']}?"
            hint = f"Use {aux.capitalize()} + subject + base verb."
        elif pattern == 1:
            sentence = f"What {aux} {subject} do every day?"
            hint = f"Use What + {aux} + subject + base verb."
            tags.append("wh_questions")
        else:
            sentence = f"{subject.capitalize()} {verb} {act['rest']} every day."
            hint = "Use subject + present simple verb + information."
    elif category == "past_simple":
        if pattern == 0:
            sentence = f"Did {subject} {act['base']} {act['rest']} last Saturday?"
            hint = "Use Did + subject + base verb."
        elif pattern == 1:
            sentence = f"What did {subject} do yesterday?"
            hint = "Use What + did + subject + base verb."
            tags.append("wh_questions")
        else:
            sentence = f"{subject.capitalize()} {act['past']} {act['rest']} two days ago."
            hint = "Use subject + past simple verb + past time expression."
    elif category in {"present_continuous", "past_continuous"}:
        past = category == "past_continuous"
        question_aux, _answer_aux, _negative_aux = be_forms(kind, _pronoun, past)
        time_text = "at seven o'clock last night" if past else "at the moment"
        if pattern == 0:
            sentence = f"{question_aux.capitalize()} {subject} {act['ing']} {act['rest']} {time_text}?"
            hint = f"Use {question_aux.capitalize()} + subject + verb-ing."
        elif pattern == 1:
            sentence = f"What {question_aux} {subject} doing {time_text}?"
            hint = f"Use What + {question_aux} + subject + doing."
            tags.append("wh_questions")
        else:
            sentence = f"{subject.capitalize()} {question_aux} {act['ing']} {act['rest']} {time_text}."
            hint = f"Use subject + {question_aux} + verb-ing."
    else:
        if pattern == 0:
            sentence = f"Can {subject} {act['base']} {act['rest']}?"
            hint = "Use Can + subject + base verb."
        elif pattern == 1:
            sentence = f"What can {subject} do today?"
            hint = "Use What + can + subject + base verb."
            tags.append("wh_questions")
        else:
            sentence = f"{subject.capitalize()} can {act['base']} {act['rest']}."
            hint = "Use subject + can + base verb."

    token_texts = phrase_tokenise(sentence)
    tokens = [
        {"id": f"rar-{category.replace('_', '-')}-{seq:03d}-t{index + 1:02d}", "text": text}
        for index, text in enumerate(token_texts)
    ]
    assert join_tokens(token_texts) == sentence, (sentence, token_texts, join_tokens(token_texts))
    return {
        "id": f"rar-{category.replace('_', '-')}-{seq:03d}",
        "type": "rearrangement",
        "category": category,
        "topic": category,
        "difficulty": difficulty(seq - 1),
        "correctSentence": sentence,
        "tokens": tokens,
        "tags": tags,
        "explanation": hint,
        "nearDuplicateKey": f"{category}:{pattern}:{act['base']}:{act['rest']}",
    }


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def generate(seed: int) -> tuple[int, int]:
    rng = random.Random(seed)
    short_questions = []
    rearrangement_questions = []
    for category in CATEGORIES:
        for actor_index in range(len(ACTORS)):
            for action_index in range(3):
                short_questions.append(
                    make_short_long_question(category, actor_index, action_index, rng)
                )
                rearrangement_questions.append(
                    make_rearrangement_question(category, actor_index, action_index)
                )

    short_bank = {
        "schemaVersion": "1.0.0",
        "bankType": "short_long",
        "seed": seed,
        "questions": short_questions,
    }
    rearrangement_bank = {
        "schemaVersion": "1.0.0",
        "bankType": "rearrangement",
        "seed": seed,
        "questions": rearrangement_questions,
    }
    manifest = {
        "schemaVersion": "1.0.0",
        "defaultSeed": seed,
        "sessionQuestionCount": 20,
        "mixedTypeCount": 10,
        "pronounRules": {
            "Peter": ["he"], "Tom": ["he"], "your uncle": ["he"],
            "your father": ["he"], "your brother": ["he"],
            "Lisa": ["she"], "Mary": ["she"], "your aunt": ["she"],
            "your mother": ["she"], "your sister": ["she"],
            "Peter and Lisa": ["they"], "your parents": ["they"], "the children": ["they"],
            "the dog": ["it"], "the cat": ["it"], "the book": ["it"], "the computer": ["it"],
            "you": ["I", "we"], "I": ["you"],
        },
        "banks": {
            "short_long": "grammar_practice_short_long.json",
            "rearrangement": "grammar_practice_rearrangement.json",
        },
        "topics": [
            {"id": "all", "label": "All Topics", "labelZh": "所有課題", "categories": CATEGORIES},
            *[
                {"id": category, "label": CATEGORY_LABELS[category], "labelZh": {
                    "present_verb_to_be": "現在式 be 動詞",
                    "past_verb_to_be": "過去式 be 動詞",
                    "present_simple": "一般現在式",
                    "past_simple": "一般過去式",
                    "present_continuous": "現在進行式",
                    "past_continuous": "過去進行式",
                    "can_cannot": "Can / Cannot",
                }[category], "categories": [category]}
                for category in CATEGORIES
            ],
            {"id": "mixed_tenses", "label": "Mixed Tenses", "labelZh": "混合時態", "categories": CATEGORIES},
            {"id": "wh_questions", "label": "Wh-Questions", "labelZh": "疑問詞問句", "categories": CATEGORIES, "requiredTag": "wh_questions"},
        ],
    }

    write_json(DATA_DIR / "grammar_practice_short_long.json", short_bank)
    write_json(DATA_DIR / "grammar_practice_rearrangement.json", rearrangement_bank)
    write_json(DATA_DIR / "grammar_practice_manifest.json", manifest)
    return len(short_questions), len(rearrangement_questions)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    parser.add_argument("--skip-validation", action="store_true")
    args = parser.parse_args()

    short_count, rearrangement_count = generate(args.seed)
    print(f"Generated {short_count} Short & Long Answer questions.")
    print(f"Generated {rearrangement_count} Sentence Rearrangement questions.")

    if not args.skip_validation:
        validator = Path(__file__).with_name("validate_grammar_practice_questions.py")
        result = subprocess.run([sys.executable, str(validator)], cwd=ROOT, check=False)
        return result.returncode
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
