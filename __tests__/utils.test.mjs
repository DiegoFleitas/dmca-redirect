import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  extractQuery,
  getOffendingDomains,
  isAllowedLumenUrl,
} from "../js/utils.js";

describe("isAllowedLumenUrl", () => {
  it("accepts https Lumen notice URLs", () => {
    assert.equal(
      isAllowedLumenUrl("https://lumendatabase.org/notices/123"),
      true
    );
    assert.equal(
      isAllowedLumenUrl("https://www.lumendatabase.org/notices/123"),
      true
    );
  });

  it("rejects hosts that are not Lumen", () => {
    assert.equal(isAllowedLumenUrl("https://example.com/notices/123"), false);
    assert.equal(
      isAllowedLumenUrl("https://lumendatabase.org.attacker.test/notices/1"),
      false
    );
    assert.equal(
      isAllowedLumenUrl("https://attacker.test/?next=lumendatabase.org"),
      false
    );
  });

  it("rejects non-https schemes", () => {
    assert.equal(
      isAllowedLumenUrl("http://lumendatabase.org/notices/123"),
      false
    );
    assert.equal(isAllowedLumenUrl("javascript:alert(1)"), false);
    assert.equal(isAllowedLumenUrl("data:text/html,<script></script>"), false);
  });

  it("rejects malformed or missing input", () => {
    assert.equal(isAllowedLumenUrl(""), false);
    assert.equal(isAllowedLumenUrl(null), false);
    assert.equal(isAllowedLumenUrl(undefined), false);
    assert.equal(isAllowedLumenUrl("not a url"), false);
  });
});

describe("getOffendingDomains", () => {
  it("returns [] without fetching when the URL is not allowlisted", async () => {
    const originalFetch = globalThis.fetch;
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      throw new Error("fetch must not be called for a rejected URL");
    };

    try {
      const result = await getOffendingDomains("https://attacker.test/dmca");
      assert.deepEqual(result, []);
      assert.equal(fetchCalled, false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

describe("extractQuery", () => {
  it("decodes a well-formed query", () => {
    assert.equal(
      extractQuery("https://www.google.com/search?q=hello+world&hl=en"),
      "hello+world"
    );
    assert.equal(
      extractQuery("https://www.google.com/search?q=caf%C3%A9"),
      "café"
    );
  });

  it("returns null when q is missing", () => {
    assert.equal(extractQuery("https://www.google.com/search?hl=en"), null);
  });

  it("returns null on malformed percent-encoding instead of throwing", () => {
    assert.equal(extractQuery("https://www.google.com/search?q=100%"), null);
    assert.equal(extractQuery("https://www.google.com/search?q=%ZZ"), null);
  });

  it("returns null for non-string input", () => {
    assert.equal(extractQuery(undefined), null);
    assert.equal(extractQuery(null), null);
  });
});
