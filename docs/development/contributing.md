# Contributing Guidelines

These guidelines help ensure code quality, maintainability, and consistency for GuildSync, a Node.js + TypeScript Discord bot project.

---

## Package Manager & Tooling

- **Always use [Yarn](https://yarnpkg.com/).**
- This project uses **Node.js** with **TypeScript**, **Prisma ORM**, and **Discord.js**.
- Install dependencies with:
  ```
  yarn install
  ```
- Run scripts with:
  ```
  yarn dev        # Start development server with ts-node-dev
  yarn build      # Compile TypeScript to JavaScript
  yarn start      # Run compiled app
  yarn lint       # Run ESLint
  yarn format     # Run Prettier
  ```
- Do **not** commit `package-lock.json` files; only `yarn.lock` should be tracked.

---

## Code Quality

- **Linting:** All code must pass strict ESLint rules.
- **Formatting:** All code must be formatted with Prettier.
- **Documentation:** Features, functions, and modules should be clearly documented using comments and/or Typedoc annotations.
- **Tests:** Add tests as infrastructure is developed.

---

## Development Workflow

1. **Clarify Requirements**
2. **Outline the Solution**
3. **Prepare Development Environment**
4. **Create Feature Branch**
5. **Implement the Feature**
6. **Testing** (if infrastructure is in place)
7. **Linting and Formatting**
8. **Update Documentation**
9. **Code Review**
10. **Manual Testing and Approval**
11. **Prepare Commit**
12. **Push Feature Branch**
13. **Create Pull Request**

---

## Code Quality Tools

- **ESLint:** Enforces strict linting rules.
- **Prettier:** Enforces consistent code formatting.
- **Typedoc:** Generates API documentation from TypeScript comments (optional).
- **Jest:** (Optional) Testing framework.
- **Prisma CLI:** For managing database migrations and local development.

---

## Additional Guidelines

- Use clear, descriptive commit messages.
- Keep PRs focused and small when possible.
- Avoid committing secrets or sensitive data.
- Follow the **12-factor app** principles for configuration.
- Prefer **async/await** over callbacks or `.then()` chains.
- Write modular, reusable code.

---

## Comment Style & Documentation

- Use **JSDoc** format for all functions, classes, and modules.
- Add inline comments for complex logic, especially with a `// Reason:` explanation.
- Keep documentation clear enough for a mid-level developer to understand.
- Update documentation continuously during development.

---

## Modular Codebase Requirements

- Keep individual source files under 500 lines; refactor when approaching this limit.
- Organize code into feature-based modules with clear separation of concerns.
- Use consistent import/export patterns.
- Prefer small, reusable functions and classes.
- Avoid tightly coupled code; favor dependency injection or clear interfaces.

---

## User & Developer Documentation

- Keep `README.md` updated with setup, usage, and contribution instructions.
- Add API references and architecture notes to documentation files.
- Include onboarding steps for new contributors.
- Document any environment variables, secrets management, and deployment steps.

---

