document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["offendingDomains", "originalQuery"], (data) => {
    const { offendingDomains, originalQuery } = data;
    const linksUl = document.getElementById("links");
    linksUl.innerHTML = ""; // clear

    if (offendingDomains && offendingDomains.length > 0 && originalQuery) {
      const headerLi = document.createElement("li");
      headerLi.className = "list-header";
      const formattedQuery = originalQuery.replaceAll("+", " ");
      headerLi.textContent = `Retry search for: ${formattedQuery}`;
      linksUl.appendChild(headerLi);

      const addedDomains = new Set();
      offendingDomains.forEach((domain) => {
        if (addedDomains.has(domain)) return;
        addedDomains.add(domain);
        const query = `${originalQuery} domain=${domain}`;
        const yandexUrl =
          "https://yandex.com/search/?text=" + encodeURIComponent(query);

        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = yandexUrl;
        link.textContent = domain;
        link.target = "_blank"; // Open link in a new tab
        li.appendChild(link);
        linksUl.appendChild(li); // Append the list item to the unordered list
      });
    } else {
      linksUl.textContent = "No offending domains found";
    }

    // Clear stored data after it has been used in the popup
    chrome.storage.local.remove(["offendingDomains", "originalQuery"]);
  });
});
