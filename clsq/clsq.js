/*
 * Stash-compatible port of local Quantumult X clsq.js request-header script.
 *
 * Purpose:
 * - Detect captured m3u8 requests that contain X-Playback-Session-Id.
 * - Build the long.* playback URL used by the original QX script.
 * - Send a notification with that URL.
 * - Return request headers in Stash's expected shape.
 */

const req = typeof $request !== "undefined" ? $request : {};
const headers = req.headers || {};
const url = req.url || "";

function hasHeader(obj, name) {
  const target = name.toLowerCase();
  return Object.keys(obj).some((key) => key.toLowerCase() === target);
}

function notify(title, subtitle, body, playbackUrl) {
  const options = playbackUrl ? { url: playbackUrl, "open-url": playbackUrl, openUrl: playbackUrl } : {};
  if (typeof $notification !== "undefined" && typeof $notification.post === "function") {
    $notification.post(title, subtitle, body, options);
    return;
  }
  if (typeof $notify === "function") {
    $notify(title, subtitle, body, options);
  }
}

if (url && hasHeader(headers, "X-Playback-Session-Id")) {
  const playbackUrl = url.replace(/\/\/(?!long)[^.]+\./, "//long.").replace(/\.m3u8/i, ".mp4");
  console.log("CLSQ playback URL captured");
  notify("CLSQ", "Video link captured", playbackUrl, playbackUrl);
}

$done({ headers });
