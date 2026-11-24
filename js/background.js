import { getOffendingDomains, getLumenUrls, extractQuery } from "./utils.js";
console.log("Background script loaded.");

const processedLumenUrls = new Set();

// Listener for web requests. Might get triggered by scrolling
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
          console.log("DMCA notice found, checking Lumen Database");
          // Extract the original query first: it must not be able to abort
          // the handler, and it is needed even if the Lumen fetch fails.
          const originalQuery = extractQuery(details.url);
          try {
            const lumenUrls = await getLumenUrls(details.tabId);
            const allOffendingDomains = [];
            for (const lumenUrl of lumenUrls) {
              if (processedLumenUrls.has(lumenUrl)) {
                console.log("Already processed, skipping.");
                continue; // Skip this URL if it's already been processed
              }
              const offendingDomains = await getOffendingDomains(lumenUrl);
              allOffendingDomains.push(...offendingDomains);
              processedLumenUrls.add(lumenUrl); // Mark this URL as processed
            }

            // Save all offending domains to local storage
            if (allOffendingDomains.length > 0) {
              chrome.storage.local.set(
                { offendingDomains: allOffendingDomains },
                () => {
                  if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                  }
                  // Log only the count: the domains are the user's browsing
                  // history and do not belong in the console log.
                  console.log(
                    "Offending domains saved:",
                    allOffendingDomains.length
                  );
                }
              );
            }
          } catch (error) {
            console.error(
              "Error fetching or parsing Lumen Database pages:",
              error
            );
          }

          chrome.storage.local.set({ originalQuery: originalQuery }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            // Log a boolean, never the search query itself.
            console.log("Query saved:", originalQuery !== null);
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
