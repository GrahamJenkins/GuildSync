# Discord Translator Bot - Planning Notes

## Project Overview
A Discord bot focused on translation with two primary features:
- **Channel Bridging:** Wizard-based setup to link channels, translating and forwarding messages between them, supporting multiple languages/channel pairs.
- **Reaction Translation:** Users react with a flag emoji to receive an inline, ephemeral translation of the message content.

The bot emphasizes:
- Strong code formatting and structure
- Clear linting standards
- High performance
- Excellent documentation
- Support for any OpenAI-compatible LLM endpoint, including local models

---

## Technology Stack

| Aspect            | Choice / Notes                                                      |
|-------------------|---------------------------------------------------------------------|
| **Language**      | Node.js with TypeScript                                             |
| **Discord Library** | discord.js (planned)                                              |
| **Translation**   | OpenAI-compatible API endpoint, configurable base URL + optional API key |
| **Hosting**       | Primarily self-hosted, with Docker container support planned        |
| **Configuration** | Environment variables via `.env` files, 12-factor app principles    |
| **Backend/DB**    | Default: SQLite (embedded); Optional: PostgreSQL (Supabase)         |
| **Linting/Format**| ESLint + Prettier with strict rules, enforced before task completion|
| **Package Manager** | Yarn only (no npm), with `yarn.lock` tracked                      |
| **Other Tools**   | _To be decided_                                                     |

---

## Proposed Project Structure

```
/docs            - Detailed design docs, architecture, API references
/src             - Source code (TypeScript)
/tests           - Automated tests
/scripts         - Utility scripts (setup, deployment, etc.)
/configs         - Configuration files (env, secrets, etc.)
README.md        - Project overview, setup instructions
TASKS.md         - Task breakdown, roadmap, todos
NOTES.md         - Planning notes (this file)
DEVELOPMENT.md   - Developer instructions, coding standards, workflow
```

---

## Architectural Decisions Log

- **Language & Runtime:** Node.js with TypeScript (strong typing, async support, discord.js ecosystem)
- **Hosting:** Primarily self-hosted on a VPS or dedicated server
- **Deployment:** Support for local development mode and Docker containerization
- **Configuration:** Use environment variables and `.env` files for secrets and environment-specific settings, following 12-factor app principles
- **Database:** Default to SQLite for simple self-hosting; support PostgreSQL (Supabase) for scalable, multi-guild deployments; abstract data access to enable backend flexibility
- **Translation Provider:** Use a single OpenAI-compatible API endpoint, configurable via base URL and optional API key; defer support for other providers or non-compatible APIs
- **Code Quality:** Enforce strict ESLint and Prettier rules; no task is complete until code passes linting and all features/functions are documented
- **Package Management:** Use Yarn exclusively; do not use npm; track only `yarn.lock`

---

## Next Questions
_(To be filled as we proceed)_

---
