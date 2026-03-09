## Privacy Policy for DMCA Redirect

This document describes how the **DMCA Redirect** browser extension handles data.

## What the Extension Does

DMCA Redirect helps you quickly retry Google searches that have been affected by DMCA notices by building equivalent searches on Yandex.

To do this, the extension:

- Observes your Google search result pages to detect the presence of a DMCA notice.
- Locates links from Google to the Lumen Database related to that notice.
- Fetches those Lumen pages and parses them to extract infringing URLs/domains.
- Stores the offending domains and original search query locally so that it can show you alternative search links in the popup.

## Data Collected and Stored

The extension stores the following values in the browser’s local extension storage (`chrome.storage.local`):

- `offendingDomains`: A list of domains extracted from Lumen DMCA entries.
- `originalQuery`: The original Google search query string used when the DMCA notice was detected.

This data is used **only** to build Yandex search links shown in the extension popup.

The data is stored locally in your browser and is not automatically synchronized to external servers by the extension.

## Network Requests

The extension does not send data to any server controlled by the extension author.

The only network requests it relies on are:

- Your normal browsing to **Google Search**.
- Requests to the **Lumen Database** pages linked from Google’s DMCA notices (to read the notice details and infringing URLs).
- Requests to **Yandex Search** generated when you click links in the popup.

## Third-Party Services

The extension interacts with:

- Google Search (as part of your existing browsing behavior).
- The Lumen Database website that hosts DMCA notices.
- Yandex Search to perform alternative searches.

These services have their own privacy policies, which are outside the control of this project.

## Data Retention

The extension currently retains the stored `offendingDomains` and `originalQuery` values in local storage until they are overwritten or cleared (e.g., by browser data clearing or future extension versions that adjust retention behavior).

Future versions may introduce explicit clearing behavior, which will be documented here.

## Contact

If you have questions or concerns about privacy in this extension, please open an issue in the repository with non-sensitive details, or contact the maintainer privately if needed.

