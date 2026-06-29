# Roadmap

## Phase 1: Project Cleanup

Goal: make the current project safe and maintainable without changing existing website behavior.

Tasks:

- Add `.gitignore` to protect local secrets.
- Add `backend/config.example.json` as a safe template.
- Add documentation under `docs/`.
- Keep existing frontend and JSON behavior unchanged.
- Keep API-related backend files for now, but mark live API generation as planned for removal.

## Phase 2: Content Generation Migration

Goal: reduce or remove dependency on live API calls.

Tasks:

- Review backend Python scripts.
- Identify which scripts are still useful without API access.
- Convert content generation into a prompt/Codex-driven JSON workflow.
- Add JSON validation and review steps.

## Phase 3: Website Improvement

Goal: improve learning features while keeping the project static-hosting friendly.

Possible future tasks:

- Improve dictation practice.
- Add more grammar modules.
- Add phonics or reading practice.
- Add review mode for wrong answers.
- Improve mobile/PWA behavior.
- Improve content selection and navigation.

## Phase 4: Hosting and Deployment

Goal: choose the simplest low-cost hosting approach.

Possible options:

- GitHub Pages for static frontend.
- Cloudflare Pages if faster CDN or custom routing is needed.
- Keep backend tools local only unless a server is truly required.
