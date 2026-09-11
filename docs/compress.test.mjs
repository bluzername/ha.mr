/**
 * @file Tests for the trailing-slash round trip (issue #89).
 *
 * Run with: node --test docs/compress.test.mjs
 * (Node's built-in test runner, no dependency needed.)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { compress, decompress } from "./compress.js";
import { outputAlphabetASCII } from "./alphabets.js";

function roundTrip (url) {
  return decompress(compress(url, outputAlphabetASCII), outputAlphabetASCII);
}

test("path with a trailing slash keeps it after a round trip", () => {
  assert.equal(
    roundTrip("https://example.com/foo/bar/"),
    "https://example.com/foo/bar/"
  );
});

test("single path segment with a trailing slash keeps it", () => {
  assert.equal(
    roundTrip("https://example.com/foo/"),
    "https://example.com/foo/"
  );
});

test("path without a trailing slash still has none after a round trip", () => {
  assert.equal(
    roundTrip("https://example.com/foo/bar"),
    "https://example.com/foo/bar"
  );
});

test("trailing slash survives together with query parameters", () => {
  assert.equal(
    roundTrip("https://example.com/foo/?a=1&b=2"),
    "https://example.com/foo/?a=1&b=2"
  );
});

test("trailing slash survives together with a hash", () => {
  assert.equal(
    roundTrip("https://example.com/foo/#section"),
    "https://example.com/foo/#section"
  );
});

test("index.html suffix keeps working and does not get a double slash", () => {
  assert.equal(
    roundTrip("https://example.com/foo/index.html"),
    "https://example.com/foo/index.html"
  );
});

test("index.php suffix keeps working and does not get a double slash", () => {
  assert.equal(
    roundTrip("https://example.com/foo/index.php"),
    "https://example.com/foo/index.php"
  );
});

test("previously-compressed links (no trailing-slash bit) still decode the same", () => {
  // These strings were produced by compress() before this fix, and must
  // keep decoding to the exact same result, since real ha.mr links are
  // shared and reopened long after they were created.
  assert.equal(
    decompress("O_h:m-eBkN(", outputAlphabetASCII),
    "https://example.com/foo/bar"
  );
  assert.equal(
    decompress("OE[UdiCOc29u!U4", outputAlphabetASCII),
    "https://example.com/foo?a=1&b=2"
  );
});
