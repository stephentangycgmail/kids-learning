# Kids Learning - Project Master Plan

> **Historical planning document:** This file records the original sprint
> sequence and long-term idea. It is not the current planning authority.
> Use [`MASTER_TASK.md`](MASTER_TASK.md) for durable constraints,
> [`PROJECT_DASHBOARD.md`](PROJECT_DASHBOARD.md) for current status, and
> [`ROADMAP.md`](ROADMAP.md) for future priorities. The original plan below is
> retained without rewriting its history.

## Vision
Build a completely static, GitHub Pages based learning platform for children. Runtime should not depend on Azure, FastAPI or paid APIs.

## Core Principles
- Static frontend only.
- JSON-driven content.
- Browser SpeechSynthesis for pronunciation.
- GitHub as the single source of truth.
- ChatGPT designs architecture.
- Codex implements repository changes.

## Development Workflow
1. Discuss requirements.
2. Design data format.
3. Implement with Codex.
4. Review changes.
5. Commit and deploy.

## Sprint Roadmap
### Sprint 1
- Repository setup
- GitHub Pages
- Initial deployment

### Sprint 2
- Remove frontend runtime API dependencies
- Disable AI Teacher
- Static runtime migration

### Sprint 3
- Content architecture
- Content standards
- Index files
- Metadata
- Repository cleanup

### Sprint 4+
- Vocabulary
- Grammar
- Reading
- Dictation
- Listening
- Phonics
- Quiz

## Long-term Goal
Adding new learning materials should only require adding JSON files without modifying application code.
