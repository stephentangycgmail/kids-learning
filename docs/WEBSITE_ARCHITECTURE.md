# Website Architecture

This is the authoritative product and page-architecture reference for the
current Kids Learning website. It describes the tracked implementation on the
`develop` branch. The repository implementation is the source of truth when
older notes differ. This is a product/navigation document; implementation
details are included only where they define page ownership or behavior.

## Current Scope

Kids Learning is a static GitHub Pages site. The student runtime is committed
HTML, CSS, JavaScript, and reviewed JSON under `frontend/`; no login, cloud
account, production backend, or Azure service is required. Browser speech uses
the Web Speech API. Grammar Practice records and Dictation preferences are
browser-local.

# Product Architecture

## Website Goal

Kids Learning helps primary-school children learn and practise English,
Chinese, and (currently placeholder) Math through short, visual, bilingual
activities. The current product separates explanation/learning from practice:
Grammar lessons teach rules and examples and may include a short guided
mini-practice; Grammar Practice provides larger randomized sessions, scoring,
results, and local history. Dictation provides conceal/reveal and speech-based
repetition. Vocabulary provides reviewed local lookup. There is no login or
server progress sync.

## Target Users

- **Primary-school children:** choose a subject, read bilingual explanations,
  listen to examples, practise answers, and review mistakes.
- **Parent/guardian or teacher:** supervise dictation, use hide/show and speech
  controls, inspect browser-local practice history, and open locked results.
- **Content maintainer/developer:** maintain catalogs, reviewed lesson JSON,
  practice banks, page scripts, and GitHub Pages-compatible navigation. There
  is no separate admin interface.

## Main Functional Areas

### Released/current student functionality

- **Home / Subjects:** English, Chinese, and Math entry cards.
- **English hub:** Vocabulary, English Dictation, Grammar, Grammar Practice,
  plus links to placeholders and the disabled AI Teacher.
- **Grammar lessons:** catalog-driven Gold Lessons. Current catalog entries
  include Present Simple, Verb to be, Present Continuous, Past Simple, Future
  Simple, Can/Can't, Must/Mustn't, There is/There are, Question Words, and
  Quantifiers.
- **Grammar lesson learning:** bilingual explanation, structure/rules,
  signal words, common mistakes, visual cards where supplied, examples with
  highlighted keywords and speech, optional guided mini-practice, optional
  five-question lesson quiz, Previous/Next Lesson, and Dictation deep link.
- **English Grammar Practice:** Short & Long Answer, Sentence Rearrangement,
  and Mixed Practice. Sessions contain 20 questions and autosave locally.
- **Question Words / Quantifiers Practice:** separate choice Practice (12
  questions, immediate feedback) and Quiz/Challenge (10 questions, feedback
  withheld until submission). Production banks contain 50 Question Words and
  54 Quantifiers questions.
- **Practice History and Result:** local session list, status filtering,
  locked submitted/abandoned records, score summaries, answer review, wrong
  answers, explanations, and navigation to a new or resumed session.
- **English Dictation:** catalog-selected banks, speech modes, hide/show,
  token speech, word hints, saved playback settings, and optional Grammar
  lesson deep-link loading.
- **Chinese Dictation:** local Chinese banks, hidden sentences, character
  speech, Cantonese/Mandarin selection, and natural/fast modes.
- **Vocabulary:** local `vocab.json` and `vocab_ai.json` lookup.

### Placeholder or disabled areas

- **Math:** `math.html` is a stable Coming Soon destination.
- **Sentences, Usage, and general Quiz:** linked from English but currently
  Coming Soon pages; they are not the Grammar Practice system.
- **AI Teacher:** retained for compatibility but explicitly disabled. The
  legacy backend/API is not production functionality.

## Product Navigation Model

```text
Root index.html
└── frontend/index.html (Subjects)
    ├── frontend/cn.html (Chinese)
    │   └── frontend/cn_dictation.html
    ├── frontend/eng.html (English)
    │   ├── frontend/vocab.html
    │   ├── frontend/dictation_practice.html
    │   ├── frontend/grammar.html
    │   │   ├── lesson query/deep link: ?lesson=<lesson-id>
    │   │   └── Dictation: dictation_practice.html?grammar=<lesson-id>
    │   ├── frontend/grammar_practice.html
    │   │   └── frontend/grammar_practice_choice.html
    │   ├── frontend/grammar_practice_history.html
    │   ├── frontend/sentences.html (placeholder)
    │   ├── frontend/usage.html (placeholder)
    │   ├── frontend/quiz.html (placeholder)
    │   └── frontend/ai_teacher.html (disabled)
    └── frontend/math.html (placeholder)
```

The normal Grammar flow is English → Grammar → select a catalog lesson → read
the explanation/visual cards/examples → optional guided mini-practice or
lesson quiz → Previous/Next Lesson or lesson Dictation. The separate Practice
flow is English → Grammar Practice → choose mode/topic → answer and autosave →
submit → Result → History or new practice. Question Words and Quantifiers have
their own choice Practice/Quiz entry from Grammar Practice.

# Content and Navigation Taxonomy

This section is the source of truth for the semantic relationship between
Grammar categories, lesson topics, and practice destinations. Navigation labels
must describe the learning concept; available UI space or the order in which a
lesson was added is not a valid classification rule.

## Taxonomy principles

- Category navigation and lesson/topic navigation are different layers. A
  category selects a semantic group; a lesson selects one topic within that
  group.
- Every production lesson has one clearly defined primary category. A lesson
  may have related Practice, Quiz, or Dictation destinations, but those do not
  change its primary category.
- Selecting a category must display only lessons belonging to that category.
- New lessons require a taxonomy decision and an update to this document before
  their catalog entry is treated as complete.

## Current production lesson classification

The current catalog is `frontend/data/grammar_catalog.json`. It now uses the
approved taxonomy keys, and the classification column below records the
implemented category assignments.

| Lesson ID | Visible title | Grammatical concept | Recommended category | Current category | Current classification correct? | Practice / Quiz / Dictation relationship |
| --- | --- | --- | --- | --- | --- | --- |
| `present-simple` | Present Simple | Present-time routines, habits, facts, and third-person `-s` forms | Tenses | Tenses | Yes | Lesson guided practice and optional lesson quiz; eligible for Grammar Practice banks; Grammar Dictation deep link where examples are supplied. |
| `verb-to-be` | Verb to be | Forms and uses of the be verb (`am`, `is`, `are`) | Be Verbs / Core Structures | Be Verbs / Core Structures | Yes | Lesson guided practice and optional lesson quiz; may link to Dictation and larger Practice independently. |
| `present-continuous` | Present Continuous | Actions happening now; `be` + verb-`ing` | Tenses | Tenses | Yes | Lesson guided practice and optional lesson quiz; eligible for Practice and Grammar Dictation. |
| `past-simple` | Past Simple | Completed past actions and regular/irregular past forms | Tenses | Tenses | Yes | Lesson guided practice and optional lesson quiz; eligible for Practice and Grammar Dictation. |
| `future-simple` | Future Simple (will) | Future predictions, decisions, and `will` forms | Tenses | Tenses | Yes | Lesson guided practice and optional lesson quiz; eligible for Practice and Grammar Dictation. |
| `can-cant` | Can / Can't | Modal ability and inability using `can` / `can't` | Modal Verbs / Core Structures | Modal Verbs / Core Structures | Yes | Lesson guided practice and optional lesson quiz; may be represented in Practice banks and linked to Dictation. |
| `must-mustnt` | Must / Mustn't | Modal obligation and prohibition using `must` / `mustn't` | Modal Verbs / Core Structures | Modal Verbs / Core Structures | Yes | Lesson guided practice and optional lesson quiz; may be represented in Practice banks and linked to Dictation. |
| `there-is-are` | There is / There are | Existential sentence pattern and singular/plural agreement | Sentence Patterns | Sentence Patterns | Yes | Lesson guided practice and optional lesson quiz; may be represented in Practice banks and linked to Dictation. |
| `question-words` | Question Words | Information questions using `what`, `who`, `where`, `when`, `why`, `which`, `whose`, and `how` | Question Forms | Question Forms | Yes | Lesson guided practice and optional lesson quiz; dedicated choice Practice (12) and Quiz/Challenge (10), with 50-bank questions; Grammar Dictation deep link may use lesson examples. |
| `quantifiers` | Quantifiers | Quantity words for countable and uncountable nouns (`some`, `any`, `many`, `much`, etc.) | Quantity / Determiners | Quantity / Determiners | Yes | Lesson guided practice and optional lesson quiz; dedicated choice Practice (12) and Quiz/Challenge (10), with 54-bank questions; Grammar Dictation deep link may use lesson examples. |

The category keys are stable data values while the visible labels remain
child-friendly. The renderer filters lessons by these catalog values; it does
not maintain a second hard-coded lesson list.

## Recommended production taxonomy

The current top-level set of Tenses, Parts of Speech, and Sentence Patterns is
not sufficient. Tenses is useful, but the other two labels are too broad for
the current lessons and do not provide a clear home for question forms,
quantity/determiner concepts, modal verbs, or the be verb. A primary-school
friendly extensible taxonomy should begin with these groups:

1. **Tenses:** Present Simple, Present Continuous, Past Simple, Future Simple.
2. **Be Verbs / Core Structures:** Verb to be.
3. **Modal Verbs / Core Structures:** Can / Can't; Must / Mustn't.
4. **Sentence Patterns:** There is / There are.
5. **Question Forms:** Question Words.
6. **Quantity and Determiners:** Quantifiers.
7. **Parts of Speech:** reserved for lessons that teach a word class, not a
   catch-all for the current records.

This keeps each lesson concept understandable to a child, leaves room for
future lessons, and avoids representing a question or quantity lesson as a
time tense. The final visible labels may be shortened for the UI, but their
semantic ownership must remain equivalent.

## Grammar navigation map

```text
Grammar
-> Category
-> Lesson
-> Learning
-> Guided Practice
-> Practice / Quiz
-> Result / History
```

The Grammar page owns learning and lesson-level actions. Larger randomized
sessions are owned by Grammar Practice; completed session evidence is owned by
Result and History. Dictation is a related destination, not a Grammar category.

# Sitemap

## Active Student-Facing Pages

| Page | File | Responsibility |
| --- | --- | --- |
| Home / Subjects | `frontend/index.html` | Main subject selector for English, Chinese, and Math. |
| Chinese Hub | `frontend/cn.html` | Chinese activity menu and entry to Chinese Dictation. |
| Chinese Dictation | `frontend/cn_dictation.html` | Hidden-sentence Chinese dictation with local data and browser speech. |
| English Hub | `frontend/eng.html` | English activity menu and parent navigation for English features. |
| Vocabulary | `frontend/vocab.html` | Local vocabulary list and explanation lookup. |
| English Dictation | `frontend/dictation_practice.html` | Catalog-driven English dictation, playback, hide/show, and word help. |
| Grammar | `frontend/grammar.html` | Catalog-driven Grammar Gold Lessons, examples, guided practice, and lesson quiz. |
| Grammar Practice | `frontend/grammar_practice.html` | Setup, topic/mode selection, 20-question practice, autosave, navigation, and submission. |
| Choice Grammar Practice | `frontend/grammar_practice_choice.html` | Question Words and Quantifiers choice Practice or Quiz/Challenge. |
| Practice History | `frontend/grammar_practice_history.html` | Browser-local list/filter of in-progress, submitted, and abandoned sessions. |
| Practice Result | `frontend/grammar_practice_result.html` | Locked submitted-session score and answer review. |

## Legacy / Internal / Placeholder Pages

| Page | File | Status |
| --- | --- | --- |
| Math | `frontend/math.html` | Student-facing placeholder; no Math activity is implemented. |
| Sentences | `frontend/sentences.html` | English Hub destination marked Coming Soon. |
| Usage | `frontend/usage.html` | English Hub destination marked Coming Soon. |
| General Quiz | `frontend/quiz.html` | English Hub destination marked Coming Soon; separate Grammar quizzes are current. |
| AI Teacher | `frontend/ai_teacher.html` | Retained entry point with disabled controls and maintenance notice. |
| Root redirect | `index.html` | Hosting redirect to `frontend/index.html`; not an activity page. |

`frontend/js/grammar.js`, `quiz.js`, and `usage.js` are legacy/empty support
files where the current page logic is inline or the page is a placeholder.
`backend/` and its generation/reference assets are local-only and not part of
the student sitemap.

# Page Relationships

| Page | Parent / entry | Child or destination pages/actions | Back navigation / deep links |
| --- | --- | --- | --- |
| `frontend/index.html` | Root redirect | `cn.html`, `eng.html`, `math.html` | None. |
| `frontend/cn.html` | Home | `cn_dictation.html` | Back to `index.html`. |
| `frontend/cn_dictation.html` | Chinese Hub | `data/cn_dictation01.json`, `data/cn_dictation02.json` | Back to `cn.html`. |
| `frontend/eng.html` | Home | Vocabulary, Dictation, Grammar, Grammar Practice, choice Practice, placeholders, AI Teacher | Back to `index.html`. |
| `frontend/grammar.html` | English Hub | Catalog lesson panels; `grammar.html?lesson=<id>`; lesson quiz; `dictation_practice.html?grammar=<id>` | Back to `eng.html`; lesson tabs and Previous/Next stay in page. |
| `frontend/dictation_practice.html` | English Hub or Grammar lesson | `data/catalog.json`; grammar deep-link lesson from `grammar_catalog.json`; dictation JSON | Back to English or back to Grammar when the `grammar` query/referrer is present. |
| `frontend/grammar_practice.html` | English Hub | `grammar_practice_choice.html`; History; Result after submit | Back to `eng.html`; History link; resume/abandon current session. |
| `frontend/grammar_practice_choice.html` | Grammar Practice | `grammar.html?lesson=<topic-id>` learning link; Result after finish; History | Back to Grammar Practice; History link. |
| `frontend/grammar_practice_history.html` | Grammar Practice or choice page | Result via `grammar_practice_result.html?id=<sessionId>`; resume/new practice | New Practice to `grammar_practice.html`. |
| `frontend/grammar_practice_result.html` | History after submitted session | Wrong/all answer views; new Practice; History | Query parameter `id` identifies a stored submitted record. |
| `frontend/vocab.html` | English Hub | Local vocabulary JSON only | Back to `eng.html`. |
| Placeholder/disabled pages | Home or English Hub | No functional child destinations | Their visible back link returns to parent. |

# Page Architecture

## Home / Main Entry — `frontend/index.html`

### Purpose

Start the child-facing subject selection flow.

### Entry Points

The root `index.html` redirects to this page for GitHub Pages.

### Page Sections

1. Header/title and short subject prompt.
2. Responsive subject cards for Chinese, English, and Math.
3. Footer note.

### Data Sources / Browser Storage

Inline HTML/CSS only; no JSON or browser storage.

### Outbound Navigation

`cn.html`, `eng.html`, `math.html`.

### Responsive Behaviour / Design Rules

Cards use a one-column layout on small screens and three columns from 600px.
Keep this page a subject chooser; activity controls belong to subject pages.

## English Hub — `frontend/eng.html`

### Purpose

Group English activities under one stable parent page.

### Entry Points

Home via `index.html`.

### Page Sections

1. Back-to-subjects control, Primary 3–4 label, title, and intro.
2. Activity card grid: Vocabulary, Sentences, English Dictation, Grammar
   Practice, Grammar, Usage, Quiz, and disabled AI Teacher.
3. Reminder copy.

### Data Sources / Browser Storage

None on the hub; child pages own their data and storage.

### Outbound Navigation

All listed English pages. Grammar Practice is a separate card from Grammar.

### Responsive Behaviour / Design Rules

The grid is one column on small screens, two at medium widths, and three at
large widths. Keep placeholder/disabled labels accurate and keep new features
under the correct child page.

## Chinese Hub — `frontend/cn.html`

### Purpose

Provide the Chinese learning menu.

### Page Sections

1. Back-to-subjects link, bilingual title, and prompt.
2. Chinese Dictation activity card.
3. Coming Soon area for Chinese vocabulary/reading/quizzes.

### Data Sources / Browser Storage

None on the hub.

### Outbound Navigation / Design Rules

Only `cn_dictation.html` is implemented. Keep Chinese activity ownership
separate from English pages; the responsive card grid must remain readable.

## English Dictation — `frontend/dictation_practice.html`

### Purpose

Support supervised English sentence dictation, listening, reading, and word
help using static content and browser speech.

### Entry Points

English Hub, or Grammar lesson Dictation action with `?grammar=<lesson-id>`.

### Page Sections

1. Header with Back/Menu action, title, and catalog selector.
2. Speech support notice when Web Speech API is unavailable.
3. Controls: Show All, Hide All, Natural/Fast/Learning mode, speed slider, and
   pause-between-token slider.
4. Scrollable sentence cards: sentence number, initially hidden/blurred text,
   translation, show/hide, play/pause, stop, and clickable word tokens.
5. Vocabulary popup from `vocab_ai.json`.

### Data Sources

`data/catalog.json` selects English dictation files. `dictation*.json` supplies
`sentences[]` items with `full` and `cn`. A Grammar query loads the selected
lesson file from `grammar_catalog.json` and maps lesson `examples` into the
same sentence-card shape. `vocab_ai.json` supplies word hints.

### Browser Storage

`localStorage` keys `kidsLearning.dictation.readMode`,
`kidsLearning.dictation.speechRate`, and
`kidsLearning.dictation.wordPauseMs` preserve playback preferences. Sentence
progress is in memory only.

### Outbound Navigation

Back to `eng.html`, or back to the referring Grammar page when a Grammar deep
link is active.

### Responsive Behaviour / Design Rules

The header and controls remain usable while the sentence list scrolls
independently. Preserve speech unsupported-state content, token identity, and
the Grammar deep-link behavior. Do not move Grammar teaching into Dictation.

## Chinese Dictation — `frontend/cn_dictation.html`

### Purpose

Provide hidden-sentence Chinese dictation with per-character speech.

### Page Sections

1. Header with menu link, bilingual title, and file selector.
2. Show All/Hide All controls, natural/fast mode, Cantonese/Mandarin selector,
   and error/status area.
3. Scrollable sentence cards, initially hidden, with show/hide, play/pause/
   resume, stop, and highlighted character speech.

### Data Sources / Browser Storage

`data/cn_dictation01.json` and `data/cn_dictation02.json` contain
`sentences[].text`. No browser storage is used; speech/highlights are in
memory and cancelled on unload.

### Outbound Navigation / Design Rules

Back to `cn.html`. Keep Chinese data and voice selection separate from English
Dictation; preserve fallback behavior when a Cantonese voice is unavailable.

## Vocabulary — `frontend/vocab.html`

### Purpose

Offer a local vocabulary list and explanation lookup.

### Page Sections

1. Header/back button.
2. `#vocab-list`, populated by `js/vocab.js`.
3. Selected-word area and Explain action; answer text combines local meaning,
   part of speech, examples, Chinese, and tense hints.

### Data Sources / Browser Storage

`js/common_api.js` loads `data/vocab.json` and `data/vocab_ai.json`. No storage
or live AI request is used.

### Outbound Navigation / Design Rules

Back to `eng.html`. Explain remains a local lookup, not an AI feature.

## Grammar Lessons — `frontend/grammar.html`

### Purpose

Teach one catalog-selected Grammar Gold Lesson at a time, with bilingual
explanation, visual learning, examples, guided mini-practice, optional lesson
quiz, speech, and navigation to adjacent lessons or Dictation.

### Entry Points

English Hub, or a deep link `grammar.html?lesson=<lesson-id>` from Practice or
other page actions.

### Internal functional sections

1. **Header:** back link to English, page title, learning prompt, and the
   current category-level controls. The header must remain available while the
   lesson content scrolls.
2. **Grammar Category Navigation:** top-level category tabs for Tenses, Be
   Verbs / Core Structures, Modal Verbs / Core Structures, Sentence Patterns,
   Question Forms, Quantity / Determiners, and reserved Parts of Speech.
   Category selection is a filter layer, not a lesson selector.
3. **Lesson Topic Navigation:** catalog-generated lesson tabs for the selected
   category. Catalog order determines the active lesson and Previous/Next order;
   a category must never show topics assigned to another category.
4. **Learning Introduction:** `explanation_en`, `explanation_zh`, learning
   objective, and bilingual summary establish the concept before practice.
5. **Rules / Pattern Area:** structure, spelling rules, signal words, keywords,
   common mistakes, and Traditional Chinese support from the lesson JSON.
6. **Visual Learning Area:** optional `visual_learning` introduction and
   bilingual cards, including the eight Question Words cards and Quantifiers'
   countable/uncountable and 18%/85% water comparison.
7. **Examples:** English examples with highlighted keywords, Chinese
   explanation, pattern/reason text, full-sentence speech, and clickable word
   speech.
8. **Guided Mini-Practice:** optional `guided_practice` multiple-choice items.
   Answering disables the item and gives immediate English/Traditional Chinese
   correctness and explanation feedback. This is lesson-level practice.
9. **Practice / Quiz Actions:** the lesson's optional five-question `quiz`
   appears through Take Quiz and reports `n/5` through Check Score. Larger
   randomized Practice/Quiz belongs to `grammar_practice.html` or the choice
   page, not this section.
10. **Dictation Action:** where lesson examples support it, open
    `dictation_practice.html?grammar=<id>`. Dictation remains a destination;
    its controls do not become Grammar lesson content.
11. **Previous Lesson / Next Lesson:** navigate adjacent lessons in the
    selected category and catalog order. Navigation must not cross a category
    boundary unless a future taxonomy explicitly defines that behavior.
12. **Responsive behavior:** topic tabs wrap at constrained widths, action
    controls remain visible, and the page must not overflow horizontally. Keep
    the fixed header, scrollable lesson content, and mobile 390px behavior
    validated by the project.

### Data Sources

`data/grammar_catalog.json` contains lesson `category`, stable `id`, title,
file, and order. Each `grammar_*_lesson.json` contains the Gold Lesson fields:
`id`, `title`, `level`, `explanation_en`, `explanation_zh`, `structure`,
`spelling_rules`, `signal_words`, `common_mistakes`, `keywords`, `examples`,
`practice`, `answer_key`, plus optional `visual_learning`,
`guided_practice`, and `quiz`.

### Browser Storage

No Grammar lesson progress is persisted. Lesson data is cached in memory for
the current page and speech is cancelled when changing sections/lessons.

### Outbound Navigation

Back to English, lesson Dictation deep link, and in-page Practice/Quiz actions.

### Responsive Behaviour

Lesson tabs must wrap at constrained widths. Quiz and Dictation action controls
must remain visible; new Grammar topics must not push those controls out of the
visible area or create horizontal page overflow. Preserve the fixed header,
scrollable lesson content, and mobile 390px behavior validated by the project.

### Important Design Rules

Grammar learning content belongs here. Guided mini-practice is lesson-level and
must not be confused with the larger randomized Grammar Practice module.
Lesson additions require a lesson JSON file and catalog entry; do not hard-code
new topic navigation in the HTML.

## Grammar Practice — `frontend/grammar_practice.html`

### Purpose

Run the general 20-question English Grammar Practice module and autosave its
unfinished session locally.

### Entry Points

English Hub; Practice History can return to New Practice or Resume.

### Page Sections

1. Header/back link and Practice History link.
2. Resume panel when an unfinished non-choice session exists, with Continue or
   Abandon. Abandoned records remain in History and are locked.
3. Setup panel with mode selection (Short & Long Answer, Sentence
   Rearrangement, Mixed Practice), topic selection derived from the manifest,
   and Start Practice.
4. Active practice panel with mode/topic metadata, question position,
   answered progress, question navigator, answer controls, Previous/Next, save
   status, and Submit for Review.
5. Submission dialog summarizes answered/unanswered questions and permits
   Submit Anyway or normal submission.

### Behavior

Question selection is seeded/balanced by `grammar_practice_core.js`, excludes
recent question IDs where possible, and creates 20 unique snapshots. Short &
Long uses structured blank sections; Rearrangement preserves token IDs,
punctuation, and capitalization. Answers save as the learner changes controls;
Next changes the current question and does not submit. Submission scores the
session, locks it, writes review data, and redirects to Result.

### Data Sources / Browser Storage

`grammar_practice_manifest.json` supplies banks, topics, count, and rules.
`grammar_practice_short_long.json` and
`grammar_practice_rearrangement.json` supply committed questions. Choice banks
are owned by the separate choice page. `js/grammar_practice_core.js` owns
selection/scoring; `js/grammar_practice_storage.js` owns persistence.

Storage uses IndexedDB database `kidsLearningGrammarPractice`, version 1,
object store `sessions`, with localStorage key
`kidsLearning.grammarPractice.sessions.v1` as fallback. Only one unfinished
general session is supported; submitted and abandoned records are read-only.

### Outbound Navigation / Design Rules

Back to English, History, choice Practice/Quiz, Resume/Abandon, and Result after
submission. Keep this module separate from lesson guided practice and from the
placeholder `quiz.html`.

## Choice Grammar Practice — `frontend/grammar_practice_choice.html`

### Purpose

Run production choice Practice and Quiz/Challenge for Question Words and
Quantifiers.

### Page Sections and Behavior

1. Header with back-to-Grammar-Practice and History links.
2. Topic selector populated from manifest topics whose `practiceType` is
   `choice`, plus Practice/Quiz mode controls and a learning link to the
   selected Grammar lesson.
3. Start action: Practice selects 12 unique bank questions; Quiz selects 10.
4. Question panel shows visual, English prompt, Traditional Chinese prompt,
   shuffled answer buttons, position/progress, and save status.
5. Practice immediately marks correct/wrong, shows the correct answer and
   bilingual `why` explanation. Quiz disables answers but says only that the
   answer was saved; feedback is hidden until submission.
6. Next advances; the final Next is Finish, scores and stores the locked record,
   then redirects to Result.

### Data Sources / Browser Storage

Loads `grammar_practice_manifest.json` and `grammar_practice_choice.json`.
Question Words has 50 questions; Quantifiers has 54. It uses the same core and
storage modules as general Practice and writes `choice_practice` or
`choice_quiz` records.

### Outbound Navigation / Design Rules

Back to Grammar Practice, learning link to `grammar.html?lesson=question-words`
or `quantifiers`, History, and Result. Do not merge these choice banks into the
general 20-question banks or into lesson guided practice.

## Grammar Practice History — `frontend/grammar_practice_history.html`

### Purpose

Show browser-local practice records to the learner, parent, or teacher.

### Page Sections

1. Header with back link and New Practice.
2. Filter toolbar for all, status, and practice-mode views.
3. History cards showing topic, mode, Submitted/In Progress/Abandoned status,
   dates, score/duration, and the appropriate View Result, Resume, or New
   Practice action.

### Data Sources / Browser Storage

Reads all validated records through `grammar_practice_storage.js` from IndexedDB
or localStorage fallback. Records are sorted newest first and remain local to
the browser/device; no cloud sync exists.

### Outbound Navigation / Design Rules

Submitted records link to `grammar_practice_result.html?id=<sessionId>`;
in-progress and abandoned records return to Practice. History owns listing and
navigation, not scoring or answer mutation.

## Grammar Practice Result — `frontend/grammar_practice_result.html`

### Purpose

Display a locked submitted session's score and review evidence.

### Page Sections

1. Header with History and New Practice actions.
2. Summary panel: fully-correct questions, correct/incorrect/unanswered counts,
   percentage where available, correct sections for Short & Long, mode/topic,
   timestamps, duration, and Submitted status.
3. Review controls for Wrong Answers and All Questions.
4. Review cards: original question, learner answer, correct answer, section
   checks where applicable, English explanation, and Traditional Chinese
   explanation.

### Data Sources / Browser Storage

The `id` query parameter identifies a stored submitted record. The page reads
the complete snapshot/review from IndexedDB or localStorage and never rebuilds
answers from a changed question bank.

### Outbound Navigation / Design Rules

History and New Practice are the primary exits. Results are read-only; retry is
a new session, not an edit of the submitted record.

## AI Teacher — `frontend/ai_teacher.html`

### Purpose

Preserve the former entry point while making the unavailable state explicit.

### Sections / Behavior

Back to English, title, maintenance notice, disabled textarea/send button, and
disabled-state message from `js/ai_teacher.js`.

### Boundary

No production API call, storage, or active teaching behavior. Do not document
Azure or backend chat as current functionality without a separately approved
architecture change.

## Mathematics — `frontend/math.html`

### Purpose / Status

Stable Home destination with title, Coming Soon message, and return-to-subjects
link. No Math data, practice, storage, or active controls exist.

# Functional Ownership Map

| Feature | Inspect first | Primary data / JS |
| --- | --- | --- |
| Subject navigation | `frontend/index.html` | Inline HTML/CSS |
| English activity navigation | `frontend/eng.html` | Inline HTML/CSS |
| Chinese activity navigation | `frontend/cn.html` | Inline HTML/CSS |
| Grammar category navigation/filtering | `frontend/grammar.html` | `data/grammar_catalog.json`, inline Grammar JS |
| Grammar lesson navigation/order | `frontend/grammar.html` | `data/grammar_catalog.json`, inline Grammar JS |
| Grammar lesson content | `frontend/grammar.html` | `data/grammar_*_lesson.json` |
| Grammar visual learning | `frontend/grammar.html` | Lesson JSON `visual_learning` |
| Grammar guided mini-practice | `frontend/grammar.html` | Lesson JSON `guided_practice` and inline renderer |
| Lesson quiz | `frontend/grammar.html` | Lesson JSON `quiz` |
| Grammar lesson Dictation deep link | `frontend/grammar.html`, `frontend/dictation_practice.html` | `grammar_catalog.json`, selected lesson JSON |
| Production Grammar Practice setup/flow | `frontend/grammar_practice.html` | `js/grammar_practice.js`, `js/grammar_practice_core.js`, `grammar_practice_manifest.json` |
| Production Practice selection/scoring | `frontend/js/grammar_practice_core.js` | `grammar_practice_manifest.json`, short/long and rearrangement banks |
| Question Words / Quantifiers choice flow | `frontend/grammar_practice_choice.html` | `js/grammar_practice_choice.js`, `grammar_practice_choice.json` |
| Practice persistence/locking | Shared Practice modules | `js/grammar_practice_storage.js` |
| History list/filter | `frontend/grammar_practice_history.html` | `js/grammar_practice_history.js` |
| Result/review | `frontend/grammar_practice_result.html` | `js/grammar_practice_result.js`, stored session snapshot |
| English Dictation | `frontend/dictation_practice.html` | `data/catalog.json`, dictation JSON, inline JS |
| Chinese Dictation | `frontend/cn_dictation.html` | `cn_dictation*.json`, inline JS |
| Vocabulary | `frontend/vocab.html` | `js/vocab.js`, `vocab.json`, `vocab_ai.json` |
| AI Teacher availability | `frontend/ai_teacher.html` | `js/ai_teacher.js`, `common_api.js` |

# Page Boundary Rules

- Grammar explanations, rules, visual cards, examples, lesson guided
  mini-practice, and lesson-specific five-question quizzes belong in
  `grammar.html` and its lesson JSON.
- Category Navigation and Lesson Navigation are separate layers. Category
  filtering belongs to the catalog-driven Grammar navigation; lesson content
  belongs to the selected lesson JSON.
- Selecting a category must display only lessons in that category, and each
  lesson must have one primary category. Question Words must not appear under
  Tenses without an explicit documented pedagogical reason; Quantifiers must
  not appear under Tenses.
- Adding a Grammar lesson requires updating the taxonomy and architecture
  documentation. UI space must not determine semantic classification, and new
  features must be placed according to Page Architecture and Content Taxonomy,
  not whichever area has available space.
- Large randomized 20-question Practice/Quiz behavior belongs in
  `grammar_practice.html` and its practice banks/core.
- Question Words and Quantifiers 12-question Practice and 10-question Quiz
  behavior belongs in `grammar_practice_choice.html` and the choice bank; do
  not duplicate it inside a lesson or the general placeholder Quiz page.
- Completed, abandoned, and in-progress session listing belongs in History;
  score/review rendering belongs in Result; persistence belongs in the storage
  module.
- Dictation functionality belongs in the English or Chinese Dictation page.
  Grammar may link to English Dictation intentionally, but Dictation controls
  must not be embedded into Grammar lessons.
- English and Chinese learning areas remain separate, with their own hubs,
  content files, speech behavior, and parent navigation.
- Hubs own navigation. New activities must be added under the correct subject
  parent and receive a documented page/data owner.
- Placeholder and disabled pages must remain accurately labelled until their
  functionality is actually implemented.
- Do not make backend/API calls a student runtime dependency or describe Azure
  as current production.

# Before Changing a Page

Future Codex sessions must:

1. Read `docs/WEBSITE_ARCHITECTURE.md` before changing navigation, page
   structure, or major feature placement.
2. For a Grammar navigation or lesson change, read Content and Navigation
   Taxonomy, confirm the lesson's primary category, and distinguish category
   filtering from lesson selection.
3. Identify the page's Purpose, Page Sections, data sources, storage, and
   outbound navigation here.
4. Inspect the parent/child relationships and Functional Ownership Map.
5. Confirm the requested behavior belongs on that page rather than a related
   page or module.
6. Preserve responsive rules, deep links, browser storage contracts, and
   locked-result/history behavior.
7. Update this document when page architecture, navigation, ownership, or
   boundaries change.
