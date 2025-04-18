# Security Policy

---

## Responsible Disclosure

If you discover a security vulnerability, please report it responsibly.

- **Do NOT** create a public GitHub issue.
- Contact the maintainers privately at **[security-contact@example.com]** (replace with actual contact).
- We will respond as quickly as possible and coordinate a fix.

---

## Secret Management

- **Never** commit secrets, API keys, or credentials to the repository.
- Use environment variables stored in `.env` files (excluded via `.gitignore` and `.rooignore`).
- Rotate secrets regularly.
- Use secret scanning tools in CI/CD pipelines.

---

## Dependency Management

- Keep dependencies up to date.
- Use tools like `yarn audit` or `npm audit` to detect vulnerabilities.
- Avoid unmaintained or untrusted packages.
- Pin dependency versions to avoid supply chain attacks.

---

## API Keys & Tokens

- Store API keys securely using environment variables.
- Limit API key permissions to the minimum required.
- Rotate keys periodically.
- Never expose secrets in logs, error messages, or client-side code.

---

## Secure Coding Practices

- Validate and sanitize all user inputs.
- Use parameterized queries to prevent SQL injection.
- Handle errors gracefully without leaking sensitive info.
- Follow the principle of least privilege.
- Review code for security issues during pull requests.

---

## Additional Recommendations

- Enable 2FA on all related accounts (GitHub, cloud providers, etc.).
- Use branch protection rules to enforce code review.
- Regularly review access permissions for collaborators.

---

