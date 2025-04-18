# GuildSync

GuildSync is a high-quality, well-documented Discord bot for seamless multilingual communication and cross-server collaboration.

---
## Overview

A **free, open-source, self-hostable** Discord bot designed to **break down language barriers** in global gaming communities. Powered by advanced AI language models, it enables **seamless, real-time multilingual communication** so players and leaders can coordinate effortlessly—no matter what languages they speak.

---
### Why Use This Bot?

- **Foster Inclusivity:** Empower your community to welcome players worldwide, creating a more connected and diverse environment.
- **Coordinate Globally:** Enable smooth collaboration for international teams, guilds, and gaming events.
- **Bridge Channels and Servers:** Seamlessly link channels *and* entire servers, with or without translation, to unify conversations across your community.
- **Powered by AI:** Leverage customizable, high-accuracy LLMs—including local models—for fast, context-aware translations.
- **Privacy-Respecting:** Run your own instance to keep conversations private, with no third-party data sharing.
- **Open Source & Free:** Unlike many existing tools, this bot is fully open source and free to use, with no hidden costs or limitations.
- **Easy to Use:** Intuitive setup with wizard-based channel and server bridging, plus reaction-triggered inline translations.
- **Future-Ready:** Designed for extensibility, with plans for a hosted version to make multilingual gaming even more accessible.

---
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **version 18.x LTS or newer required** (due to native fetch support)
- [Yarn](https://yarnpkg.com/) (required, **do not use npm**)
- A **Discord bot token** (see below)
- An **OpenAI-compatible API endpoint URL**, API key, and model name

### Discord Bot Setup

You will need a **Discord bot token** to run GuildSync.

If you don't already have a bot, follow the detailed instructions in [docs/DISCORD_BOT_SETUP.md](./docs/DISCORD_BOT_SETUP.md) to create one, configure permissions, and invite it to your server.

Once you have your bot token, add it to your `.env` file as shown below.

### Environment Variables and Folder Setup for Docker

For local development and Docker, ensure your `.env` file contains the following environment variable to specify the SQLite database file path:

```env
DATABASE_URL="file:./db.sqlite"
```

Note: Due to a known Prisma issue, relative paths in `DATABASE_URL` are resolved relative to the Prisma schema file location. To avoid issues, the application automatically resolves this path to an absolute path at runtime.

When running in Docker, the `docker-compose.yml` mounts the project root and `.env` file to the container, ensuring consistent database file location between local and Docker environments.

Make sure the database file is writable by the application to allow data persistence.

To run GuildSync in Docker, you need to set up the following folders and environment variables:

1. Create two folders in your project root:
   - `data/` — to hold the `.env` file
   - `db/` — to hold the SQLite database file

2. Add these folders to your `.gitignore` to avoid committing sensitive data.

3. Copy the `.env.sample` file into the `data/` folder as `.env`:

   ```bash
   cp .env.sample data/.env
   ```

4. Edit `data/.env` to add your Discord bot token and other required environment variables

### Important Note on Docker Compose Compatibility

- The current Docker setup **is not compatible with the standalone `docker-compose` CLI tool** (e.g., version 1.29.2) due to known compatibility issues with Python dependencies.
- You **must use the newer Docker Compose CLI plugin**, invoked as:

  ```bash
  docker compose up -d
  ```

  This command runs the containers in detached (daemon) mode.

- Using `docker compose` ensures full compatibility with the Compose file format and avoids errors related to unsupported URL schemes.

---
### Build and Run Docker Container

- Build the Docker image:

  ```bash
  docker build -t guildsync-bot .
  ```

- Run the container using Docker Compose:

  ```bash
  docker compose up -d
  ```

- The container mounts the `data/` and `db/` folders for persistent configuration and database storage.

---
## Language Support

When creating or joining a sync group, you can specify a **language code** for the channel. This controls the translation target/source language.

- Defaults to **English (`en`)** if unspecified.
- Supports many languages, including Spanish (`es`), French (`fr`), German (`de`), Chinese (`zh`), Japanese (`ja`), and more.
- The bot will suggest common languages when using slash commands.

---
## How to Work on This Project

- **Start here:** This README.md
- **Development guidelines:** See [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Project architecture and decisions:** See [NOTES.md](./NOTES.md)
- **Task list and roadmap:** See [TASKS.md](./TASKS.md)

---
## Contribution Guidelines

- **Use Yarn only** for all package management
- **Strict linting and formatting** enforced (ESLint + Prettier)
- **Document all features and functions**
- **No task is complete until it passes linting and is fully documented**
- Follow the detailed workflow in [DEVELOPMENT.md](./DEVELOPMENT.md)

> **⚠️ WARNING:** If you do not follow these contribution policies, your work will be **rejected by default**. Always clarify uncertainties and obtain required approvals before starting.

---
## Task Complexity & Branching Policy (Summary)

- **Simple tasks** (minor fixes, typos, initial setup, quick non-impactful changes):
  - Work **directly on the `dev` branch**
  - No need for prior approval or feature branches
- **All other tasks** (new features, refactors, architectural changes, or anything non-trivial):
  - **Prepare a plan and get approval before coding**
  - **Create a feature branch from `dev`**
  - **Push your branch immediately**
  - **Open a Pull Request for review before merging**

_Default to treating tasks as non-trivial unless clearly simple. See [DEVELOPMENT.md](./DEVELOPMENT.md) for full details._

---
## Documentation

- **Architecture & decisions:** [NOTES.md](./NOTES.md)
- **Developer instructions:** [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Tasks & roadmap:** [TASKS.md](./TASKS.md)
- **Additional docs:** To be added in `/docs`

---
## License

_To be decided_

---
## Contact

_Maintainer info to be added_