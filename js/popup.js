document.getElementById("suggest").addEventListener("click", () => {
  chrome.storage.local.get(["offendingDomains", "originalQuery"], (data) => {
    let { offendingDomains, originalQuery } = data;
    if (offendingDomains && offendingDomains.length > 0 && originalQuery) {
      let query = `${originalQuery} `;
      // just use first domain (yandex doesn't seem to support multiple domains nor OR operators along w the query)
      // TODO: show alternatives in the popup in the future
      query += `${
        offendingDomains?.[0] ? "domain=" + offendingDomains[0] : ""
      }`;
      let yandexUrl =
        "https://yandex.com/search/?text=" + encodeURIComponent(query);
      chrome.tabs.create({ url: yandexUrl });
    } else {
      console.error("Data not found in storage", data);
    }
  });
});
