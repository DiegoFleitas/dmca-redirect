export const getOffendingDomains = async (lumenUrl) => {
  let response = await fetch(lumenUrl);
  let text = await response.text();
  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");
  let infringingUrls = Array.from(doc.querySelectorAll(".infringing_url")).map(
    (elem) => elem.outerText.match(/([^\s]+)/)[0]
  );
  return infringingUrls;
};

export const getLumenUrls = (tabId) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(
      tabId,
      {
        code: `
            Array.from(document.querySelectorAll('a'))
              .filter(link => link.textContent.includes('DMCA'))
              .map(link => link.href)
          `,
      },
      (results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          // just the first
          resolve(results[0]);
        }
      }
    );
  });
};

export const extractQuery = (url) => {
  let match = url.match(/[?&]q=([^&]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};
