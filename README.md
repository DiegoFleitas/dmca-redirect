# DMCA Redirect

Redirects Google DMCA-blocked searches to Yandex.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [How This Works](#how-this-works)
- [Development](#development)
- [Testing](#testing)
- [Contribute](#contribute)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/DiegoFleitas/dmca-redirect.git
   cd dmca-redirect
   ```

2. Zip & load the extension in Firefox:
   - Type `about:debugging` in the Firefox address bar and press Enter.
   - Click "This Firefox" > "Load Temporary Add-on" and select any file in the `DMCA-Redirect` directory.

## Usage

1. Perform a search on Google.
2. If a DMCA notice is detected on the search result page, the extension icon will show a yellow badge.
3. Click the extension icon to open a popup.
4. Click the "Search on Yandex" button in the popup to perform the same search on Yandex.

![demo](https://github.com/DiegoFleitas/dmca-redirect/assets/15369935/7fb4bc46-a84a-46f9-8227-0967136695c1)

## How This Works

This extension is your buddy when Google searches hit a DMCA notice. It quickly shuffles you over to Yandex to continue your search. Here’s the gist:

1. **Different Platforms**:
    - Since Google and Yandex are separate platforms, the issuer of a DMCA takedown notice may have only targeted Google. This could lead to the availability of certain content on Yandex that's been removed from Google due to DMCA notices.

2. **Different Jurisdictions**:
    - Google, being a U.S.-based search engine, adheres to DMCA takedown notices under U.S. copyright law. Yandex, rooted in Russia, operates under a jurisdiction known for a more relaxed stance on copyright laws. This might allow Yandex to display search results that could have been blocked on Google.

## Development

### Prerequisites

- Firefox Browser.
- Basic knowledge of HTML, CSS, and JavaScript.
 - Recent Node.js and **pnpm** (preferred package manager for this project).

### Structure

- `popup.html` and `popup.css`: Define the popup UI and styling.
- `background.js`: Contains the main logic for detecting DMCA notices and saving the search query.
- `popup.js`: Handles user interaction in the popup.

### Local setup & scripts

From the project root:

```bash
pnpm install
pnpm run lint
pnpm test
pnpm run package
```

This installs dependencies and runs the same scripts used in CI with pnpm.

### Building

No build step is required. Just load the extension in Firefox and it's ready for testing and development.

## Releases

- Versioning: Git tags follow the pattern `vX.Y.Z` (for example, `v1.4.1`) and should match the `version` in both `manifest.json` and `package.json`.
- Automated release build:
  - Pushing a tag like `v1.4.1` triggers the `Release` GitHub Actions workflow.
  - The workflow installs dependencies, runs lint and tests, then builds `dist/dmca-redirect.zip` via `pnpm run package`.
  - That zip is attached as an asset to the GitHub Release for the same tag.
- Publishing to Mozilla Add-ons (AMO):
  - Download the `dmca-redirect.zip` asset from the corresponding GitHub Release.
  - Upload that zip to the Firefox Add-ons dashboard for review/publishing.
  - This keeps the GitHub release and the AMO-listed version aligned.
- Tagging & pushing:

  ```bash
  # bump versions in manifest.json and package.json first
  git commit -am "Release v1.4.1"
  git tag v1.4.1
  git push origin main --tags
  ```

- Helper script:

  ```bash
  # example: release version 1.4.1
  pnpm run release -- 1.4.1
  # this updates manifest.json and package.json, commits, and tags v1.4.1
  ```

## Testing

Follow the [Firefox Extension Workshop’s testing instructions](https://extensionworkshop.com/documentation/develop/testing-persistent-and-restart-features/) to test the extension’s persistent and restart features.

## Contribute

Contributions are welcome! Feel free to open issues and submit pull requests.

## Browser Support & Manifest

This extension is currently implemented as a **Manifest V2** WebExtension and is primarily tested in **Firefox**. Other browsers that support MV2-style WebExtensions may work, but are not officially supported.

For future compatibility, a migration path to **Manifest V3** should be considered, especially for Chromium-based browsers where MV2 is being deprecated.

## Privacy & Data Usage

The extension:

- Reads Google search result pages only to detect the presence of a DMCA notice and to locate links to the Lumen Database.
- Fetches the corresponding Lumen pages to extract infringing URLs/domains.
- Stores the following values in `chrome.storage.local`:
  - `offendingDomains`: the list of domains extracted from Lumen DMCA entries.
  - `originalQuery`: the original Google search query string.
- Uses these values **only** to build Yandex search links in the popup UI.

No data is sent to any server controlled by the extension author. Network requests go only to:

- Google Search (as part of normal browsing),
- Lumen Database pages linked from Google’s DMCA notices, and
- Yandex Search for the alternative queries.

For more details, see [PRIVACY.md](PRIVACY.md).

## Security & Reporting Vulnerabilities

If you believe you have found a security or privacy issue in this extension, please:

1. Avoid opening a public issue with sensitive details.
2. Report it privately via the contact information or issue tracker guidelines in [SECURITY.md](SECURITY.md).

The `SECURITY.md` document also outlines what types of issues are in scope and expected response practices.

## Contributing Guidelines & Code of Conduct

Before contributing, please review:

- [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, coding standards, and testing instructions.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.
