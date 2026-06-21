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
const hasPlaybackSessionHeader = hasHeader(headers, "X-Playback-Session-Id");
const isAlreadyLongPlaybackUrl = /^https?:\/\/long\./i.test(url);

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

console.log("CLSQ request script executed");
console.log("request url: " + url);
console.log("has X-Playback-Session-Id: " + hasPlaybackSessionHeader);
console.log("is already long playback url: " + isAlreadyLongPlaybackUrl);

if (url && hasPlaybackSessionHeader && !isAlreadyLongPlaybackUrl) {
  const originalM3u8Url = url;
  const longM3u8Url = originalM3u8Url.replace(/\/\/(?!long)[^.]+\./, "//long.");
  const longMp4Url = longM3u8Url.replace(/\.m3u8/i, ".mp4");
  const playbackUrl = longM3u8Url;
  console.log("CLSQ playback URL captured");
  console.log("original m3u8: " + originalM3u8Url);
  console.log("long m3u8: " + longM3u8Url);
  console.log("long mp4: " + longMp4Url);
  notify("CLSQ", "Open long m3u8", "Original: " + originalM3u8Url + "\nLong m3u8: " + longM3u8Url + "\nLong mp4: " + longMp4Url, playbackUrl);
} else if (isAlreadyLongPlaybackUrl) {
  console.log("CLSQ playback notification skipped for long url");
}

$done({ headers });
