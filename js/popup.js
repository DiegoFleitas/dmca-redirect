document.getElementById("suggest").addEventListener("click", () => {
  chrome.storage.local.get("query", (data) => {
    let query = data.query;
    if (query) {
      let yandexUrl =
        "https://yandex.com/search/?text=" + encodeURIComponent(query);
      chrome.tabs.create({ url: yandexUrl });
    } else {
      console.error("Query not found in storage");
    }
  });
});
