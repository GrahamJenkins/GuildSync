# Development Guidelines

These instructions **must** be followed by all contributors to ensure code quality, maintainability, and consistency.

> **⚠️ WARNING:** Failure to follow these instructions and policies will result in your work being **rejected by default**. Always clarify uncertainties and obtain required approvals before proceeding.

---

## Task Complexity & Branching Policy

Before starting any work, determine if your task is **simple** or **non-trivial**:

### Simple Tasks
- Minor, low-risk changes such as:
  - Initializing the project (e.g., Yarn init, adding TypeScript)
  - Fixing typos or minor bugs
  - Updating comments or documentation without architectural impact
  - Small configuration tweaks
- Do **not** affect core features, architecture, or data models
- Can be completed quickly (typically under 30 minutes)
- Require **no design decisions** or new features

**For simple tasks:**
- Work **directly on the `dev` branch**
- Commit and push changes without prior approval
- Skip the formal planning and review process

---

### Non-Trivial Tasks
All other tasks, including new features, refactors, architectural changes, or anything with potential impact **must** follow the full workflow:

- Prepare a detailed plan and get explicit approval **before** coding
- Pull the latest `dev` branch
- Create a **feature branch** from `dev` (e.g., `feat/short-description`)
- Push the feature branch **immediately** after creation
- Commit early and often with descriptive messages
- Open a Pull Request targeting `dev` when ready
- Obtain review and approval before merging

**Default assumption is non-trivial unless explicitly simple. When in doubt, ask the project manager.**

---

---

## Package Manager

- **Always use [Yarn](https://yarnpkg.com/). Do NOT use npm.**
- Install dependencies with:
  ```
  yarn install
  ```
- Run scripts with:
  ```
  yarn lint
  yarn format
  yarn test
  yarn start
  ```
- Do **not** commit `package-lock.json` files; only `yarn.lock` should be tracked.

---

## Task Completion Criteria

- **Linting:** All code **must** pass strict ESLint rules before a task is considered complete.
- **Formatting:** All code **must** be formatted with Prettier.
- **Documentation:** Every feature, function, and module **must** be clearly documented using comments and/or Typedoc annotations.
- **Tests:** (When applicable) New features should include appropriate tests.

**No task is complete until it meets all of the above requirements.**

---

## Development Workflow

1. **Clarify Requirements**
   - Carefully review the assigned task and all related documentation.
   - Identify any ambiguities, missing details, or uncertainties.
   - **Ask explicit questions** to the project manager or task creator to resolve all uncertainties **before** writing any code.
   - Do not proceed until all questions are satisfactorily answered.

2. **Outline the Solution**
   - Prepare a clear, concise outline of the planned implementation.
   - Include key steps, components, and any architectural considerations.
   - Present this outline to the project manager or task creator for approval **before** starting development.

3. **Prepare Development Environment**
   - Pull the latest changes from the `dev` branch:
     ```
     git checkout dev
     git pull origin dev
     ```
   - Verify the codebase is lint-free:
     ```
     yarn lint
     ```
   - Resolve any existing lint errors before proceeding.

4. **Create Feature Branch**
   - Create a new branch from `dev` using the naming convention:
     ```
     feat/short-descriptive-task-name
     ```
   - Example:
     ```
     git checkout -b feat/channel-bridge-setup
     ```

5. **Implement the Feature**
   - Develop the feature according to the approved outline.
   - Prioritize clean, maintainable, and well-structured code.
   - Avoid hacks, workarounds, or "spaghetti code."
   - If encountering design challenges or tempted to implement suboptimal solutions, **pause and consult** the project manager.
   - Document any architectural or design decisions made during implementation.

6. **Testing**
   - Write appropriate unit and integration tests.
   - Run all tests locally:
     ```
     yarn test
     ```
   - Ensure all tests pass before proceeding.

7. **Linting and Formatting**
   - Run linting and formatting tools:
     ```
     yarn lint
     yarn format
     ```
   - Fix any issues until the codebase is clean.

8. **Update Documentation**
   - Update or add relevant documentation (code comments, Typedoc, README, NOTES, API docs).
   - Ensure new features and changes are well-documented.

9. **Update `TASKS.md`**
   - After completing your task, update `TASKS.md` to reflect the new status (e.g., mark as ✅ Done, add completion date/notes).
   - **Stage and commit the updated `TASKS.md` file along with your code changes.**
   - This ensures the task list remains accurate and synchronized with the codebase.

9. **Code Review**
   - Perform a thorough self-review or request a peer review.
   - Address any feedback or identified issues.

10. **Manual Testing and Approval**
    - Request the project manager or task creator to perform manual testing.
    - Incorporate any feedback or required changes.
    - Obtain explicit sign-off before proceeding.

11. **Prepare Commit**
    - Propose a clear, descriptive commit message summarizing the changes.
    - Submit the message for approval by the project manager.
    - Upon approval, stage and commit the changes:
      ```
      git add .
      git commit -m "Approved commit message"
      ```

12. **Push Feature Branch**
    - Push the branch to the remote repository:
      ```
      git push origin feat/short-descriptive-task-name
      ```

13. **Create Pull Request**
    - Open a Pull Request (PR) targeting the `dev` branch.
    - Ensure all CI checks pass.
    - Request reviews as needed.
    - After all approvals, **squash and merge** the PR to maintain a clean commit history.

---

## Code Quality Tools

- **ESLint:** Enforces strict linting rules.
- **Prettier:** Enforces consistent code formatting.
- **Typedoc:** Generates API documentation from TypeScript comments (planned).
- **Jest:** Testing framework (planned).

---

## Additional Guidelines

- Use **clear, descriptive commit messages**.
- Keep PRs **focused and small** when possible.
- Avoid committing secrets or sensitive data.
- Follow the **12-factor app** principles for configuration.
- Prefer **async/await** over callbacks or `.then()` chains.
- Write **modular, reusable code**.

---

## Global AI Assistant Rules

- **Always read `PLANNING.md` and `TASKS.md`** at the start of a new AI-assisted session.
- **Check `TASKS.md`** before starting a new task; update it with new or completed tasks.
- **Never assume missing context.** Ask clarifying questions if uncertain.
- **Never hallucinate libraries or functions.** Use only known, verified packages.
- **Confirm file paths and module names** before referencing them.
- **Never delete or overwrite existing code** unless explicitly instructed or part of a defined task.
- **Limit prompts to one focused task** for consistent results.
- **Restart conversations** regularly to maintain LLM quality.

---

## Comment Style & Documentation

- Use **JSDoc** format for all functions, classes, and modules:
  ```typescript
  /**
   * Brief summary.
   *
   * @param {string} param1 - Description.
   * @returns {number} Description.
   */
  function example(param1: string): number {
    // Reason: Explain why this approach is used
  }
  ```
- Add **inline comments** for complex logic, especially with a `// Reason:` explanation.
- Keep documentation clear enough for a mid-level developer to understand.
- Update documentation continuously during development.

---

## Modular Codebase Requirements

- Keep individual source files **under 500 lines**; refactor when approaching this limit.
- Organize code into **feature-based modules** with clear separation of concerns.
- Use **consistent import/export patterns**.
- Prefer **small, reusable functions and classes**.
- Avoid tightly coupled code; favor dependency injection or clear interfaces.

---

## User & Developer Documentation

- Keep `README.md` updated with setup, usage, and contribution instructions.
- Add API references and architecture notes to `/docs` or inline markdown files.
- Include onboarding steps for new contributors.
- Document any environment variables, secrets management, and deployment steps.
- Expand documentation as new features are added.

---

## Future Additions

- Branch naming conventions (expand)
- Commit message style guide
- CI/CD pipeline instructions
- Release process
- Security best practices

---

By following these guidelines, we ensure a high-quality, maintainable, and well-documented codebase.