# Docker Support for GuildSync Bot

## Overview

This document outlines the plan and instructions for Docker support for the GuildSync Discord bot, enabling containerized deployment for both local development and production environments.

---

## Dockerfile

- **Base Image:** Official Node.js 20 LTS image for best performance and compatibility.
- **Working Directory:** `/app` inside the container.
- **Dependency Installation:** Copy `package.json` and `yarn.lock` to leverage Docker layer caching, then run `yarn install`.
- **Source Code:** Copy the rest of the source code.
- **Build Step:** Run `yarn build` to compile TypeScript to JavaScript in the `dist` directory.
- **Data and Config Directories:** Create `./data` directory inside the container to hold the `.env` file, and `./db` directory to hold the SQLite database file.
- **Environment Variables:** Copy `.env.sample` to `.env` inside the `./data` directory if `.env` does not exist.
- **Entrypoint:** Run the bot with `node dist/index.js`.
- **Graceful Shutdown:** Ensure the bot handles standard Docker signals (`SIGINT`, `SIGTERM`) to allow graceful stop and restart.

---

## Environment Variable Handling

- The container loads environment variables from an editable `.env` file located in the `./data` directory.
- The `.env` file should be created from `.env.sample` if missing.
- The `SQLITE_PATH` variable has been removed as it is redundant.
- Use `DATABASE_URL` as the single source for database connection configuration.
- By default, `DATABASE_URL` points to a local SQLite file in the `./db` directory.

---

## docker-compose.yml

- Defines a service for the bot container.
- Mounts local volumes for:
  - The `./data` directory containing the `.env` file (editable by the user).
  - The `./db` directory containing the SQLite database file.
- Enables persistent data and configuration for local development.
- Supports environment variable injection from the mounted `.env` file.

---

## Development and Production Support

- **Development Mode:** Optionally mount source code and use `yarn dev` for live reload.
- **Production Mode:** Run the built JavaScript with `node dist/index.js`.
- **Graceful Handling:** The bot should respond properly to Docker stop and restart commands by handling termination signals and cleaning up resources.

---

## Usage Instructions

- Build the Docker image with:
  ```bash
  docker build -t guildsync-bot .
  ```
- Run the container with:
  ```bash
  docker run --env-file ./data/.env -v $(pwd)/data:/app/data -v $(pwd)/db:/app/db guildsync-bot
  ```
- Or use docker-compose for local development with volume mounts for `./data` and `./db` directories.

---

## Node.js Version

- The container uses Node.js 20 LTS for best performance and latest features.

---

## Implementation Plan

1. **Dockerfile Implementation**
   - Use Node.js 20 LTS base image.
   - Set working directory to `/app`.
   - Copy `package.json` and `yarn.lock` for dependency caching.
   - Run `yarn install`.
   - Copy source code.
   - Run `yarn build` to compile TypeScript.
   - Create `./data` and `./db` directories inside the container.
   - Copy `.env.sample` to `./data/.env` if `.env` does not exist.
   - Entrypoint: `node dist/index.js`.
   - Implement signal handlers for graceful shutdown on `SIGINT` and `SIGTERM`.

2. **docker-compose.yml Implementation**
   - Define a service for the bot container.
   - Mount volumes:
     - `./data` directory for `.env` file.
     - `./db` directory for SQLite database.
   - Support environment variable injection from mounted `.env`.
   - Support development mode with source code mount and `yarn dev`.
   - Support production mode running built JavaScript.

3. **Environment Variable Handling**
   - Use `.env` file in `./data` directory.
   - Remove `SQLITE_PATH` variable.
   - Use `DATABASE_URL` pointing to SQLite file in `./db`.

4. **Development and Production Modes**
   - Development: mount source code, run `yarn dev`.
   - Production: run `node dist/index.js`.
   - Ensure graceful handling of Docker stop and restart commands.

5. **Documentation and Usage**
   - Document build and run commands.
   - Explain volume mounts and environment variable usage.
   - Document graceful shutdown behavior.

6. **Development Workflow**
   - Follow guidelines in DEVELOPMENT.md.
   - Create feature branch from `dev`.
   - Commit early and often.
   - Write tests if applicable.
   - Run linting and formatting.
   - Update TASKS.md.
   - Request review and approval.

7. **Task Updates**
   - Mark Dockerfile and environment variable support tasks as In Progress and then Done upon completion.

8. **Code Review and Merge**
   - Ensure linting and tests pass.
   - Obtain approvals and merge feature branch.

---

## Summary

This Docker setup provides a clean, maintainable, and flexible environment for running the GuildSync bot in both local development and production, with clear environment variable management, persistent storage, and graceful handling of Docker lifecycle commands.

Please refer to this document for building, running, and configuring the Docker container.