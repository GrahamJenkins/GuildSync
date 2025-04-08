# GuildSync Database Migrations Guide

---

## Overview

GuildSync uses **Prisma ORM** to manage the database schema and migrations. This supports both **SQLite** (for local development) and **PostgreSQL/Supabase** (for production).

---

## Environment Setup

Set the `DATABASE_URL` environment variable:

- **SQLite (default for development):**

```
DATABASE_URL="file:./dev.db"
```

- **PostgreSQL / Supabase (production):**

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> **Note:** You can override `DATABASE_URL` in your deployment environment or `.env` file

---

## Initial Setup

1. **Install dependencies**

```bash
yarn install
```

2. **Generate Prisma client**

```bash
yarn prisma:generate
```

---

## Creating a Migration

1. **Edit `prisma/schema.prisma`** to update the schema.

2. **Create a new migration**

```bash
yarn prisma:migrate:dev --name descriptive_migration_name
```

This updates your local database and generates migration SQL files.

---

## Applying Migrations in Production

1. **Set `DATABASE_URL`** to your production database.

2. **Run migrations**

```bash
yarn prisma:migrate:deploy
```

---

## Useful Commands

| Command                       | Description                                   |
|-------------------------------|-----------------------------------------------|
| `yarn prisma:generate`        | Generate Prisma client                       |
| `yarn prisma:migrate:dev`     | Create & apply migration in dev environment  |
| `yarn prisma:migrate:deploy`  | Apply migrations in production               |
| `yarn prisma:studio`          | Open Prisma Studio (GUI for DB)              |

---

## Switching Databases

- Change the `DATABASE_URL` to point to your desired database.
- Run `yarn prisma:migrate:deploy` to apply existing migrations.
- Use `yarn prisma:migrate:dev` for new migrations.

---

## Notes

- Prisma generates SQL migration files in `prisma/migrations/`.
- Never commit `.env` files with secrets.
- Keep schema and migrations under version control.
- Review generated SQL before applying in production.

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Studio](https://www.prisma.io/studio)