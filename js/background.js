console.log("Background script loaded.");

const extractQuery = (url) => {
  let match = url.match(/[?&]q=([^&]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

// Listener for web requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details); // Log the details object
    // Inject a script into the tab to check for a DMCA notice
    chrome.tabs.executeScript(
      details.tabId,
      {
        code: 'document.body.innerText.includes("DMCA")',
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        console.log(results); // Log the results object
        // Check the result of the script injection
        if (results[0]) {
          console.log("DMCA notice found, redirecting to Yandex");
          let query = extractQuery(details.url);
          console.log(query); // Log the extracted query
          chrome.storage.local.set({ query: query }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            console.log("Query saved:", query);
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
