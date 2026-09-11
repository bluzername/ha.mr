/**
 * @file Builds the user-facing short link and QR-code payload URL from a
 * compressed payload, respecting the chosen HTTP/HTTPS output scheme.
 *
 * Pulled out of main.js so the URL-building itself does not need a DOM
 * to run and test (see issue #26 - the output link/QR was always built
 * as "http://...", even when the person generating it wants "https://").
 */

/**
 * @param {string} domain Domain (and optional port) hosting ha.mr.
 * @param {string} payload Compressed link payload (already encoded).
 * @param {boolean} useHttps Whether the generated link should use HTTPS.
 * @returns {string} Full clickable link, e.g. "https://ha.mr#AbC123".
 */
export function buildOutputLink (domain, payload, useHttps) {
  return `${useHttps ? "https" : "http"}://${domain}#${payload}`;
}

/**
 * @param {string} domain Domain (and optional port) hosting ha.mr.
 * @param {string} payload Compressed QR-alphabet payload.
 * @param {boolean} useHttps Whether the generated QR code should use HTTPS.
 * @returns {string} Full QR code payload URL, e.g. "HTTPS://HA.MR/ABC123".
 */
export function buildQrLink (domain, payload, useHttps) {
  return `${useHttps ? "HTTPS" : "HTTP"}://${domain.toUpperCase()}/${payload}`;
}
