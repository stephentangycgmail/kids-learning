import json
import re
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "frontend" / "data"


class GrammarPracticeQuestionBankTests(unittest.TestCase):
    def test_validator_accepts_committed_banks(self):
        result = subprocess.run(
            [sys.executable, "tools/validate_grammar_practice_questions.py"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Total questions: 630", result.stdout)
        self.assertIn("Error count: 0", result.stdout)

    def test_generated_counts_and_ids(self):
        short = json.loads((DATA_DIR / "grammar_practice_short_long.json").read_text(encoding="utf-8"))
        rearrangement = json.loads((DATA_DIR / "grammar_practice_rearrangement.json").read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(short["questions"]), 300)
        self.assertGreaterEqual(len(rearrangement["questions"]), 300)
        all_ids = [item["id"] for item in short["questions"] + rearrangement["questions"]]
        self.assertEqual(len(all_ids), len(set(all_ids)))

    def test_manifest_uses_static_relative_bank_names(self):
        manifest = json.loads((DATA_DIR / "grammar_practice_manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["sessionQuestionCount"], 20)
        self.assertEqual(manifest["mixedTypeCount"], 10)
        self.assertEqual(manifest["banks"]["choice"], "grammar_practice_choice.json")
        for filename in manifest["banks"].values():
            self.assertNotIn("/", filename)
            self.assertTrue((DATA_DIR / filename).is_file())

    def test_completed_answers_do_not_repeat_auxiliaries(self):
        bank = json.loads((DATA_DIR / "grammar_practice_short_long.json").read_text(encoding="utf-8"))
        malformed = ("isn't is", "aren't are", "wasn't was", "weren't were", "can't can")
        for question in bank["questions"]:
            self.assertEqual(set(question["completedAnswers"]), {"short_yes", "short_no", "long_yes", "long_no"})
            for answer in question["completedAnswers"].values():
                self.assertFalse(any(re.search(rf"\b{re.escape(phrase)}\b", answer.lower()) for phrase in malformed), answer)

    def test_static_pages_have_unique_ids_and_valid_local_references(self):
        pages = [
            ROOT / "frontend" / "grammar_practice.html",
            ROOT / "frontend" / "grammar_practice_result.html",
            ROOT / "frontend" / "grammar_practice_history.html",
        ]
        for page in pages:
            source = page.read_text(encoding="utf-8")
            ids = re.findall(r'\bid="([^"]+)"', source)
            self.assertEqual(len(ids), len(set(ids)), f"duplicate ID in {page.name}")
            for reference in re.findall(r'(?:src|href)="([^"#?]+)"', source):
                if re.match(r"^(?:https?:|mailto:|javascript:)", reference):
                    continue
                self.assertTrue((page.parent / reference).resolve().exists(), f"missing {reference} from {page.name}")


if __name__ == "__main__":
    unittest.main()
