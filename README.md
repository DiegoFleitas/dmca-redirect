# DMCA Redirect

Firefox extension that detects DMCA notices on Google search results and lets you repeat the same search on Yandex with one click.

## Installation

1. Clone this repo and load the extension:
   - Open `about:debugging` in Firefox
   - Click "This Firefox" → "Load Temporary Add-on" → select any file in the `DMCA-Redirect` directory

## Usage

1. Search on Google.
2. If a DMCA notice is detected, the extension icon shows a yellow badge.
3. Click the icon → "Search on Yandex".

![demo](https://github.com/DiegoFleitas/dmca-redirect/assets/15369935/7fb4bc46-a84a-46f9-8227-0967136695c1)

## Development

Requires Node.js and pnpm.

```bash
pnpm install
pnpm run lint
pnpm test
pnpm run package
```

No build step — load the directory directly in Firefox for testing.

## Releases

Versioning follows `vX.Y.Z`. Tags must match `version` in both `manifest.json` and `package.json`.

```bash
# bump versions in manifest.json and package.json, then:
pnpm run release -- 1.4.1   # updates versions, commits, tags v1.4.1
git push origin main --tags
```

Pushing a tag triggers the `Release` workflow, which produces `dist/dmca-redirect.zip` as a GitHub Release asset. Upload that zip to the Firefox Add-ons dashboard to publish.

## Privacy

The extension only reads Google search result pages to detect DMCA notices and extract the original query. It stores `offendingDomains` and `originalQuery` in `chrome.storage.local` to build Yandex links. No data is sent to any server controlled by the extension author. See [PRIVACY.md](PRIVACY.md).

## Security / Contributing

Report vulnerabilities privately per [SECURITY.md](SECURITY.md). See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

**Browser support:** Manifest V2, primarily tested in Firefox.
