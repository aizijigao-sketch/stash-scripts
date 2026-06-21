/*
 * Stash-compatible port of local Quantumult X clsq.js request-header script.
 *
 * Purpose:
 * - Detect captured m3u8 requests that contain X-Playback-Session-Id.
 * - Send a notification that opens the original m3u8 URL.
 * - Log the original m3u8, long.* m3u8, and long.* mp4 candidates for diagnosis.
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
  const originalM3u8Url = url;
  const longM3u8Url = originalM3u8Url.replace(/\/\/(?!long)[^.]+\./, "//long.");
  const longMp4Url = longM3u8Url.replace(/\.m3u8/i, ".mp4");
  const playbackUrl = originalM3u8Url;
  console.log("CLSQ playback URL captured");
  console.log("original m3u8: " + originalM3u8Url);
  console.log("long m3u8: " + longM3u8Url);
  console.log("long mp4: " + longMp4Url);
  notify("CLSQ", "Open original m3u8", playbackUrl, playbackUrl);
}

$done({ headers });
