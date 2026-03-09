## Contributing to DMCA Redirect

Thank you for considering a contribution to **DMCA Redirect**!

This project is a small browser extension, but we still try to follow common industry practices so changes remain easy to review and maintain.

## Getting Started

- **Prerequisites**
  - Firefox browser (for loading and testing the extension).
  - Recent Node.js and npm (for tooling, linting, and tests once configured).
  - Basic knowledge of HTML, CSS, and JavaScript.

- **Setup**
  1. Fork and clone the repository.
  2. Create a feature branch from `main`.
  3. Install dependencies (if any are defined in `package.json`).

## Development Workflow

1. Make your changes in small, focused commits.
2. Run formatting and linting tools if configured (e.g. `npm run lint`, `npm run format`).
3. Run tests (e.g. `npm test`) once a test suite is in place.
4. Manually test the extension in Firefox:
   - Go to `about:debugging`.
   - Choose **This Firefox** → **Load Temporary Add-on**.
   - Select any file in the repository directory.

## Coding Style

- Prefer modern JavaScript (`const`/`let`, arrow functions where appropriate).
- Keep functions small and focused.
- Avoid adding new global variables; keep logic inside modules.
- When in doubt, follow the existing style in the codebase.

As tooling (ESLint, Prettier, etc.) is introduced, please run the configured commands before opening a pull request and fix any reported issues.

## Commit Messages & Pull Requests

- Write clear, descriptive commit messages that explain the **why**, not just the **what**.
- For pull requests:
  - Describe the motivation and high-level changes.
  - Note any user-facing changes or permission changes in the extension.
  - Mention how you tested your changes.

## Code of Conduct

By participating in this project, you agree to uphold the [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior as described there.

