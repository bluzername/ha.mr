/**
 * @file Tests for the HTTP/HTTPS output link toggle (issue #26).
 *
 * Run with: node --test docs/output-link.test.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildOutputLink, buildQrLink } from "./output-link.js";

test("output link defaults to http when https is not requested", () => {
  assert.equal(buildOutputLink("ha.mr", "AbC123", false), "http://ha.mr#AbC123");
});

test("output link uses https when requested", () => {
  assert.equal(buildOutputLink("ha.mr", "AbC123", true), "https://ha.mr#AbC123");
});

test("qr link defaults to http and uppercases the domain", () => {
  assert.equal(buildQrLink("ha.mr", "ABC123", false), "HTTP://HA.MR/ABC123");
});

test("qr link uses https when requested", () => {
  assert.equal(buildQrLink("ha.mr", "ABC123", true), "HTTPS://HA.MR/ABC123");
});

test("output link keeps a custom port", () => {
  assert.equal(
    buildOutputLink("localhost:8080", "xYz", false),
    "http://localhost:8080#xYz"
  );
});
