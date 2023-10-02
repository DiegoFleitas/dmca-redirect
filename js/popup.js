document.getElementById("suggest").addEventListener("click", () => {
  chrome.storage.local.get(["offendingDomains", "originalQuery"], (data) => {
    let offendingDomains = data.offendingDomains;
    let originalQuery = data.originalQuery;
    if (offendingDomains && offendingDomains.length > 0 && originalQuery) {
      let query = `${originalQuery} domain=${offendingDomains.join(
        " OR domain="
      )}`;
      let yandexUrl =
        "https://yandex.com/search/?text=" + encodeURIComponent(query);
      chrome.tabs.create({ url: yandexUrl });
    } else {
      console.error("Query not found in storage");
    }
  });
});
