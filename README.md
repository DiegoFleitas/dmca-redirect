# DMCA Redirect

Redirects Google DMCA-blocked searches to Yandex.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contribute](#contribute)
- [License](#license)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/DiegoFleitas/dmca-redirect.git
   cd dmca-redirect
   ```

2. Load the extension in Firefox:
   - Type `about:debugging` in the Firefox address bar and press Enter.
   - Click "This Firefox" > "Load Temporary Add-on" and select any file in the `DMCA-Redirect` directory.

## Usage

1. Perform a search on Google.
2. If a DMCA notice is detected on the search result page, the extension icon will show a yellow badge.
3. Click the extension icon to open a popup.
4. Click the "Search on Yandex" button in the popup to perform the same search on Yandex.

## Development

### Prerequisites

- Firefox Developer Edition.
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

## License

[MIT License](LICENSE)
