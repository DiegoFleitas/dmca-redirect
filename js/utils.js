const LUMEN_APEX_HOSTNAME = "lumendatabase.org";
const LUMEN_SUBDOMAIN_SUFFIX = ".lumendatabase.org";

// Allowlist for fetch targets: only https URLs on lumendatabase.org (or a
// subdomain of it) are accepted. Everything else is rejected before any
// network request is made, so a page-supplied href cannot steer the fetch.
export const isAllowedLumenUrl = (url) => {
  if (typeof url !== "string" || url.length === 0) {
    return false;
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  if (parsed.protocol !== "https:") {
    return false;
  }

  const hostname = parsed.hostname.toLowerCase();
  return (
    hostname === LUMEN_APEX_HOSTNAME ||
    hostname.endsWith(LUMEN_SUBDOMAIN_SUFFIX)
  );
};

export const getOffendingDomains = async (lumenUrl) => {
  if (!isAllowedLumenUrl(lumenUrl)) {
    console.warn("Rejected non-Lumen URL, not fetching it.");
    return [];
  }

  const response = await fetch(lumenUrl);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  return Array.from(doc.querySelectorAll(".infringing_url"))
    .map((elem) => elem.textContent.trim().match(/\S+/))
    .filter(Boolean)
    .map((match) => match[0]);
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
  if (typeof url !== "string") {
    return null;
  }

  const match = url.match(/[?&]q=([^&]*)/);
  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    // Malformed percent-encoding (e.g. "?q=100%") is a validation failure,
    // not an exception worth aborting the handler for.
    return null;
  }
};
