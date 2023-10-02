import { getOffendingDomains, getLumenUrls, extractQuery } from "./utils.js";
console.log("Background script loaded.");

let processedLumenUrls = new Set();

// Listener for web requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Inject a script into the tab to check for a DMCA notice
    chrome.tabs.executeScript(
      details.tabId,
      {
        code: 'document.body.innerText.includes("DMCA")',
      },
      async (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        // Check the result of the script injection
        if (results[0]) {
          console.log("DMCA notice found, redirecting to Yandex");
          // Extract the Lumen Database URL and original query
          try {
            let lumenUrls = await getLumenUrls(details.tabId);
            let allOffendingDomains = [];
            for (let lumenUrl of lumenUrls) {
              if (processedLumenUrls.has(lumenUrl)) {
                console.log("Already processed:", lumenUrl);
                continue; // Skip this URL if it's already been processed
              }
              let offendingDomains = await getOffendingDomains(lumenUrl);
              allOffendingDomains.push(...offendingDomains);
              processedLumenUrls.add(lumenUrl); // Mark this URL as processed
            }
            // Save all offending domains to local storage
            chrome.storage.local.set(
              { offendingDomains: allOffendingDomains },
              () => {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                  return;
                }
                console.log("Offending domains saved:", allOffendingDomains);
              }
            );
          } catch (error) {
            console.error(
              "Error fetching or parsing Lumen Database pages:",
              error
            );
          }

          let originalQuery = extractQuery(details.url);
          chrome.storage.local.set({ originalQuery: originalQuery }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            console.log("Query saved:", originalQuery);
          });
          // Set badge text and background color
          chrome.browserAction.setBadgeText({
            text: "!",
            tabId: details.tabId,
          });
          chrome.browserAction.setBadgeBackgroundColor({
            color: "yellow",
            tabId: details.tabId,
          });
        }
      }
    );
  },
  { urls: ["*://www.google.com/search?*"] }
);
