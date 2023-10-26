document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["offendingDomains", "originalQuery"], (data) => {
    let { offendingDomains, originalQuery } = data;
    let linksUl = document.getElementById("links");
    linksUl.innerHTML = ""; // clear
    if (offendingDomains && offendingDomains.length > 0 && originalQuery) {
      let headerLi = document.createElement("li");
      headerLi.className = "list-header";
      let formattedQuery = originalQuery.replaceAll("+", " ");
      headerLi.textContent = `Retry search for: ${formattedQuery}`;
      linksUl.appendChild(headerLi);
      let addedDomains = new Set();
      offendingDomains.forEach((domain) => {
        if (addedDomains.has(domain)) return;
        addedDomains.add(domain);
        let query = `${originalQuery} domain=${domain}`;
        let yandexUrl =
          "https://yandex.com/search/?text=" + encodeURIComponent(query);

        let li = document.createElement("li");
        let link = document.createElement("a");
        link.href = yandexUrl;
        link.textContent = domain;
        link.target = "_blank"; // Open link in a new tab
        li.appendChild(link);
        linksUl.appendChild(li); // Append the list item to the unordered list
      });
    } else {
      linksUl.textContent = "No offending domains found";
    }
  });
});
