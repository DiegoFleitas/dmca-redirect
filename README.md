<div align="center">
  <img src="icon.png" alt="DMCA Redirect icon" width="64" />
  <h1>DMCA Redirect</h1>
  <p>Firefox extension that detects DMCA notices on Google search results and lets you retry the same search on Yandex.</p>
</div>

[![CI](https://github.com/DiegoFleitas/dmca-redirect/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoFleitas/dmca-redirect/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/DiegoFleitas/dmca-redirect)](https://github.com/DiegoFleitas/dmca-redirect/releases)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

When Google displays a DMCA notice, some search results are hidden. DMCA Redirect detects the notice, looks up the reported domains in the [Lumen Database](https://lumendatabase.org/), and gives you one-click Yandex links to retry the search.

![demo](https://github.com/DiegoFleitas/dmca-redirect/assets/15369935/7fb4bc46-a84a-46f9-8227-0967136695c1)

## How it works

1. A background script monitors your Google search requests.
2. If the page contains a DMCA notice, the extension follows the linked Lumen Database entries to extract the reported domains.
3. The extension badge turns yellow to signal a match.
4. The popup shows a Yandex link for each domain, using your original query.

All processing happens locally. The extension sends no data to any external server. See [PRIVACY.md](PRIVACY.md).

## Installation

### Sideload from a release

1. Download `dmca-redirect.zip` from the [latest release](https://github.com/DiegoFleitas/dmca-redirect/releases/latest).
2. In Firefox, open `about:addons` → gear icon → **Install Add-on From File…** → select the zip.

### Load temporarily (for development)

1. Open `about:debugging` in Firefox → **This Firefox** → **Load Temporary Add-on…**
2. Select any file inside the cloned repository directory.

> [!NOTE]
> The extension uses Manifest V2 and is primarily tested in Firefox.

## Usage

1. Search on Google as normal.
2. When a DMCA notice is detected, the extension icon shows a yellow badge.
3. Click the icon to see Yandex search links for each domain. Click one to retry the search.

## Development

Requires Node.js 24 and pnpm 11.

```bash
pnpm install         # install dev dependencies
pnpm run lint        # lint JS source files
pnpm run format      # check formatting
pnpm test            # run tests
pnpm run package     # build dist/dmca-redirect.zip
```

No build step. Load the repository directory directly in Firefox for live testing.

## Releasing

Versions follow `vX.Y.Z`. `manifest.json` and `package.json` must have the same version number.

```bash
pnpm run release -- 1.5.3   # bumps versions, commits, and tags v1.5.3
git push origin main --tags
```

Pushing the tag triggers the **Release** workflow, which builds `dist/dmca-redirect.zip` and attaches it to a GitHub Release. Upload that zip to the [Firefox Add-ons dashboard](https://addons.mozilla.org/developers/) to publish to AMO.
