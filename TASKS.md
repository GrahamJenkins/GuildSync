# Project Tasks & Roadmap

This file tracks all major tasks, features, and improvements for the Discord Translator Bot.

---

## How to Use This File

- **Add a new task:** Under the relevant section, add a new row with status 🟢 To Do.
- **Start a task:** Change its status to 🟡 In Progress and add your name/date in Notes.
- **Complete a task:** Change status to ✅ Done, add completion date in Notes.
- **Discoveries during work:** Add unexpected sub-tasks or issues to the "Discovered During Work" section below.
- **Update regularly:** Keep this file current to reflect project status.

> **Note:** After updating this file, **always commit your changes along with related code updates** to keep the task list synchronized.

---


---

## Legend

| Status        | Description                        |
|---------------|------------------------------------|
| 🟢 To Do      | Planned, not yet started           |
| 🟡 In Progress| Currently being worked on          |
| ✅ Done       | Completed                          |

---

## Initial Setup

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Initialize git repository                         | 🟢 To Do      |                                        |
| Populate `.gitignore` with common Node, OS, and editor ignores | 🟢 To Do      |                                        |
| Setup Yarn project with TypeScript                | ✅ Done       | Completed 2025-04-06                   |
| Configure ESLint with strict rules                | ✅ Done       | Completed 2025-04-05                   |
| Configure Prettier with strict rules              | ✅ Done       | Completed 2025-04-05                   |
| Setup environment variable support (`.env`)       | 🟢 To Do      |                                        |
| Create Dockerfile for production                  | 🟢 To Do      |                                        |
| Setup SQLite integration                         | ✅ Done       | Prisma with SQLite configured, 2025-04-07 |
| Plan PostgreSQL (Supabase) integration (future)   | 🟢 To Do      | Planned for future deployment          |
| Document Node.js 18+ requirement in README        | ✅ Done       | Added 2025-04-08, due to native fetch dependency |

---

## Core Features
| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Implement Discord bot login/auth                  | ✅ Done       | Completed 2025-04-06, modularized with structured logging and dotenv support |
| Implement channel bridging wizard                 | 🟢 To Do      |                                        |
| Implement cross-server bridging (with or without translation) | 🟢 To Do      | Enable linking channels across different servers, optionally with translation |
| Implement message translation via LLM API         | ✅ Done       | Completed 2025-04-08, with retry logic and OpenAI-compatible API support |
| Implement per-channel language support            | ✅ Done       | Completed 2025-04-08, slash command options, stored in DB                   |
| Refactor environment variables for LLM API (`LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL`) | ✅ Done | Completed 2025-04-08                   |
| Implement reaction-based inline translation       | 🟢 To Do      | No ephemeral support; triggers DM or public reply                           |
| Implement context menu translation command        | 🟢 To Do      | Ephemeral response; if user language unset, prompt selection before translating |
| Implement context menu to set user language       | 🟢 To Do      | Allows user to set preferred language independently of translation          |
| Abstract translation provider interface           | 🟢 To Do      |                                        |
| Store channel/user configs in SQLite              | 🟢 To Do      |                                        |
| Admin commands for managing bridges               | 🟢 To Do      |                                        |
| Dynamic SyncGroup Builder wizard (interactive, replaces `/gc create`) | 🟢 To Do      | [Discord.js Select Menus Guide](https://discordjs.guide/message-components/select-menus.html#auto-populating-select-menus) - User-friendly group builder with questions for language, channel, etc. |
---
---

## Simplified MVP - Minimal Chat Bridge

> These tasks are a **minimal subset** for rapid MVP delivery and **do not duplicate** the broader planned features above. They can be marked complete independently.

| Task                                                      | Status        | Notes                                                  |
|-----------------------------------------------------------|---------------|--------------------------------------------------------|
| Implement `updateGuild` internal function                 | ✅ Done       | Upserts guild info, called internally                  |
| Implement `createSyncGroup` internal function             | ✅ Done       | Creates sync groups, called internally                 |
| Implement `/guildsync` and `/gs` commands with 'create' and 'join' parameters | ✅ Done       | Unified command with branching logic                   |
| Implement logic to create sync groups via command         | ✅ Done       | Calls `createSyncGroup` internally                     |
| Implement logic to join sync groups via command           | ✅ Done       | Links current channel to existing sync group           |
| Implement basic bidirectional message sync (no translation) | ✅ Done   | Forward messages between linked channels               |
| Verify minimal database schema supports bridging          | ✅ Done       | Guilds, SyncGroups, ChannelLinks tables                |

---

---

## Architecture Components

| Component                 | Status        | Description                                                      |
|---------------------------|---------------|------------------------------------------------------------------|
| Event Listener            | ✅ Done       | Handles Discord events and dispatches to appropriate handlers    |
| Command Handler           | ✅ Done       | Parses commands, checks permissions, routes to features          |
| Bridge Manager (Sync Manager) | ✅ Done   | Manages linked channels/servers, message syncing                 |
| Translation Service       | ✅ Done       | Interfaces with LLM APIs, abstracts translation providers        |
| Config Manager            | 🟢 To Do      | Loads, caches, and validates guild/channel/user configs          |
| Database Layer            | ✅ Done       | Abstracts SQLite/Postgres, manages data access                   |
| Logging & Error Handling  | 🟡 Partial    | Basic console logs, improve with structured logging              |

---

## Infrastructure & Tooling

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Setup Jest for testing                            | 🟢 To Do      |                                        |
| Setup CI pipeline (GitHub Actions, etc.)          | 🟢 To Do      |                                        |
| Generate API docs with Typedoc                    | 🟢 To Do      |                                        |
| Write developer onboarding docs                   | 🟢 To Do      |                                        |
| Add Docker support for development and production | 🟢 To Do      | Create Dockerfile, docker-compose, update README with build/run instructions |

---

## Data Modeling & Schema Design

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Define data models for Guild, Channel, User       | ✅ Done       | Prisma schema defined, 2025-04-07      |
| Design Bridge definitions schema                  | 🟢 To Do      | How channels/servers are linked        |
| Plan configuration storage schema                 | 🟢 To Do      | Per-guild/channel/user configs         |
| Enforce one sync group per Discord channel        | 🟢 To Do      | Add unique constraint or validation to prevent multiple group memberships per channel |
| Sync group unique enforcement                     | 🟢 To Do      | Enforce at DB and app level that a channel can belong to only one sync group |
| Create ER diagrams or schema sketches             | 🟢 To Do      | Visualize data relationships           |
| Create database migrations for schema             | ✅ Done       | Prisma migrations ready, 2025-04-07    |
| Implement schema models in code                   | 🟢 To Do      | Implement runtime data access layer    |
| Plan database migrations                          | ✅ Done       | Migration workflow documented, 2025-04-07 |
| Abstract DB access for SQLite/Postgres            | 🟢 To Do      | Use ORM or custom abstraction layer    |

---

## Error Handling, Logging & Monitoring

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Design centralized structured logging             | 🟢 To Do      | Use a logging library, JSON logs       |
| Define error handling strategies                  | 🟢 To Do      | Graceful failures, user feedback       |
| Integrate error reporting (e.g., Sentry)          | 🟢 To Do      | Optional, for production deployments   |
| Plan monitoring and alerting                      | 🟢 To Do      | Health checks, alerts (optional)       |
| Document logging/error conventions                | 🟢 To Do      | Standardize log levels, error formats  |

---

## Command Structure, Permissions & UX Flows

| Task                                              | Status        | Notes                                                             |
|---------------------------------------------------|---------------|-------------------------------------------------------------------|
| Design command hierarchy                          | 🟢 To Do      | Slash commands, subcommands, help system                          |
| Define permission model                           | 🟢 To Do      | Admin vs. user commands, Discord role integration                 |
| Design setup wizard UX flow                      | 🟢 To Do      | Step-by-step channel/server linking, error handling               |
| Design help and onboarding flows                 | 🟢 To Do      | User guidance, fallback messages                                  |
| Review UX expectations with project manager      | 🟢 To Do      | Clarify desired flows and user experience before implementation   |
| Improve permission checks                        | 🟢 To Do      | More granular admin/user roles, command restrictions              |

---

## Security Considerations

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Implement rate limiting for commands and events   | 🟢 To Do      | Prevent spam and abuse                 |
| Design abuse prevention mechanisms                | 🟢 To Do      | Blacklists, throttling, anomaly detection |
| Define permission scopes and least privilege      | 🟢 To Do      | Minimize bot permissions on Discord    |
| Plan secret management                            | 🟢 To Do      | Secure storage of API keys, tokens     |
| Review security best practices                    | 🟢 To Do      | Regular audits, dependency updates     |

---

## Deployment Environments & CI/CD

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Define development, staging, production environments | 🟢 To Do    | Separate configs, secrets, databases   |
| Plan environment-specific configuration management | 🟢 To Do      | Use `.env` files, secret managers      |
| Design automated deployment pipelines             | 🟢 To Do      | GitHub Actions, Docker builds, tests   |
| Implement environment-specific secret management  | 🟢 To Do      | Avoid secret leakage, use vaults       |
| Document deployment workflows                     | 🟢 To Do      | Clear instructions for each environment|

---

## Architecture Diagrams

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Create high-level component diagrams              | 🟢 To Do      | Show main modules and interactions     |
| Create data flow diagrams                         | 🟢 To Do      | Illustrate message and data movement   |
| Create sequence diagrams for key flows            | 🟢 To Do      | E.g., message translation, bridging    |
| Maintain diagrams alongside code changes          | 🟢 To Do      | Keep architecture docs up to date      |







---

## Documentation

| Task                                              | Status        | Notes                                  |
|---------------------------------------------------|---------------|----------------------------------------|
| Finalize README.md                                | ✅ Done       |                                        |
| Finalize DEVELOPMENT.md                           | ✅ Done       |                                        |
| Finalize NOTES.md                                | ✅ Done       |                                        |
| Create detailed architecture diagrams             | 🟢 To Do      |                                        |
| Write user guide for bot setup and usage          | 🟢 To Do      |                                        |
| Add quickstart MVP documentation                  | 🟢 To Do      | Minimal guide for setup and testing MVP sync                       |

---

## Future Features

- Multi-guild/server support with PostgreSQL backend
- Support for additional LLM providers
- Web dashboard for configuration
- Analytics and usage stats
- Localization of bot responses
- More granular permission controls
---
## Discovered During Work

| Date       | Description                                         | Status        | Notes                     |
|------------|-----------------------------------------------------|---------------|---------------------------|
|            |                                                     |               |                           |

---

## Testing Policies

- **Framework:** Use [Jest](https://jestjs.io/) for all unit and integration tests.
- **Coverage:** Every function/module must have tests covering:
  - At least one expected success case
  - At least one edge case
  - At least one intentional failure/error case
- **Mocking:** Mock all external services (Discord API, LLM APIs, databases) to ensure tests are deterministic.
- **Location:** Place tests in a `/tests` directory mirroring the source structure.
- **Automation:** Tests must pass before merging any pull request.
- **Continuous Integration:** Integrate tests with CI pipeline (e.g., GitHub Actions).
- **Test Data:** Avoid using real secrets or API keys in tests; use environment variables or mocks.

---

Update this file regularly to track progress and plan new work.