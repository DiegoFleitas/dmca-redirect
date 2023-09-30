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

## How This Works

The extension notifies & allows you to quickly perform the same Google searches that are affected by DMCA takedown notices to Yandex. The reason for this functionality is rooted in the different legal jurisdictions under which Google and Yandex operate, which may affect their compliance with DMCA takedown requests. Here's a brief explanation:

1. **Different Jurisdictions**:
    - Google, being a U.S.-based search engine, complies with DMCA takedown notices as per U.S. copyright law. On the other hand, Yandex is based in Russia, a jurisdiction known for not enforcing most copyright laws as stringently as the U.S. This legal distinction potentially allows Yandex to display search results that may have been blocked on Google due to DMCA requests.

2. **Different Platforms**:
    - Since Google and Yandex are different platforms, it's possible that the issuer of a DMCA takedown notice might have requested the removal of content from Google, but not from Yandex. This discrepancy could lead to the availability of certain content on Yandex that has been removed from Google due to DMCA notices.

## Development

### Prerequisites

- Firefox Browser.
- Basic knowledge of HTML, CSS, and JavaScript.

### Structure

- `popup.html` and `popup.css`: Define the popup UI and styling.
- `background.js`: Contains the main logic for detecting DMCA notices and saving the search query.
- `popup.js`: Handles user interaction in the popup.

### Building

No build step is required. Just load the extension in Firefox and it's ready for testing and development.

## Testing

Follow the [Firefox Extension Workshop’s testing instructions](https://extensionworkshop.com/documentation/develop/testing-persistent-and-restart-features/) to test the extension’s persistent and restart features.

## Contribute

Contributions are welcome! Feel free to open issues and submit pull requests.
