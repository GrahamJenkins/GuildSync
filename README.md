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

### Who Is It For?

- **Gaming communities** that want to include players from around the world.
- **Guild leaders and event organizers** coordinating international teams.
- **Any Discord server** looking to reduce friction in multilingual conversations.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [Yarn](https://yarnpkg.com/) (required, **do not use npm**)
- A **Discord bot token** (see below)
- An OpenAI-compatible API endpoint URL (and optional API key)

### Obtaining a Discord Bot Token

- Visit the [Discord Developer Portal](https://discord.com/developers/applications)
- Create a **new application**
- Navigate to the **Bot** tab and add a bot to your application
- Copy the **bot token** and keep it secure
- Use this token in your `.env` configuration

### Setup

1. **Clone the repository**

```
git clone <repo-url>
cd discord-translator
```

2. **Install dependencies**

```
yarn install
```

3. **Configure environment variables**

Create a `.env` file based on `.env.example` (to be created) with your secrets and configuration.

4. **Run the bot in development mode**

```
yarn dev
```

---

## How to Work on This Project

- **Start here:** This README.md
- **Development guidelines:** See [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Project architecture and decisions:** See [NOTES.md](./NOTES.md)
- **Task list and roadmap:** See [TASKS.md](./TASKS.md)

### Selecting a Task

1. Open [TASKS.md](./TASKS.md)
2. Choose an unassigned or open task
3. Follow the workflow in [DEVELOPMENT.md](./DEVELOPMENT.md)
4. Ensure your work meets all linting, formatting, and documentation standards
5. Submit a pull request for review

---

## Contribution Guidelines

- **Use Yarn only** for all package management
- **Strict linting and formatting** enforced (ESLint + Prettier)
- **Document all features and functions**
- **No task is complete until it passes linting and is fully documented**
- Follow the detailed workflow in [DEVELOPMENT.md](./DEVELOPMENT.md)

> **⚠️ WARNING:** If you do not follow these contribution policies, your work will be **rejected by default**. Always clarify uncertainties and obtain required approvals before starting.

---

### Task Complexity & Branching Policy (Summary)

- **Simple tasks** (minor fixes, typos, initial setup, quick non-impactful changes):
  - Work **directly on the `dev` branch**
  - No need for prior approval or feature branches
- **All other tasks** (new features, refactors, anything non-trivial):
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