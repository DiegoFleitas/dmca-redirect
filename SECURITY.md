## Security Policy for DMCA Redirect

This document describes how to report security issues and the general security posture of the **DMCA Redirect** browser extension.

## Reporting a Vulnerability

If you believe you have found a security or privacy issue in this extension:

1. **Do not** publicly disclose sensitive details in a new GitHub issue or pull request.
2. Provide a brief, non-sensitive description of the issue via:
   - A private message to the maintainer (if contact information is available), or
   - A minimal GitHub issue indicating that you have found a potential security problem and would like to share details privately.

Please include:

- The version of the extension you are using.
- The browser and version.
- Steps to reproduce the issue, if possible.

## Scope

Examples of issues that are generally in scope:

- Unauthorized access to or leakage of user data handled by the extension.
- Extension permissions being broader than required, leading to realistic abuse scenarios.
- Injection vulnerabilities caused by untrusted content being executed in extension context.

Examples that are generally out of scope:

- Issues that require full access to a user’s machine or browser beyond the extension.
- Problems that only affect outdated or unsupported browser versions.

## Data Handling Overview

- The extension stores:
  - `offendingDomains`: Domains extracted from Lumen DMCA entries.
  - `originalQuery`: The original Google search query string when a DMCA notice is detected.
- These values are stored in the browser’s local extension storage (`chrome.storage.local`) and used solely to build alternative Yandex search links.
- The extension does **not** transmit this data to any server controlled by the project maintainers.

For more details, see [PRIVACY.md](PRIVACY.md).

## Responsible Disclosure

The maintainer aims to:

- Acknowledge receipt of a security report in a reasonable timeframe.
- Investigate and, where appropriate, patch confirmed issues.
- Credit reporters who wish to be acknowledged, once a fix is released and the issue is safe to disclose.

