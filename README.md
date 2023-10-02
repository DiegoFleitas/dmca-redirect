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

This extension is your buddy when Google searches hit a DMCA notice. It quickly shuffles you over to Yandex to continue your search. Here’s the gist:

1. **Different Platforms**:
    - Since Google and Yandex are separate platforms, the issuer of a DMCA takedown notice may have only targeted Google. This could lead to the availability of certain content on Yandex that's been removed from Google due to DMCA notices.

2. **Different Jurisdictions**:
    - Google, being a U.S.-based search engine, adheres to DMCA takedown notices under U.S. copyright law. Yandex, rooted in Russia, operates under a jurisdiction known for a more relaxed stance on copyright laws. This allows Yandex to display search results that might have been blocked on Google.

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
