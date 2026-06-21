/*
 * CLSQ media response header normalizer for Stash.
 *
 * Some captured HLS playlists are served as text/plain. Safari can reject those
 * when opening the notification URL, so keep the body untouched and only set
 * media-specific response headers for playlist/key/segment requests.
 */

const req = typeof $request !== "undefined" ? $request : {};
const resp = typeof $response !== "undefined" ? $response : {};
const url = req.url || "";
const headers = Object.assign({}, resp.headers || {});

function setHeader(name, value) {
  const existing = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  if (existing) {
    headers[existing] = value;
  } else {
    headers[name] = value;
  }
}

console.log("CLSQ media header script executed");
console.log("media url: " + url);

if (/\.m3u8(?:[?#]|$)/i.test(url)) {
  setHeader("Content-Type", "application/vnd.apple.mpegurl");
  console.log("media content-type set: application/vnd.apple.mpegurl");
} else if (/\.ts(?:[?#]|$)/i.test(url)) {
  setHeader("Content-Type", "video/mp2t");
  console.log("media content-type set: video/mp2t");
} else if (/(?:crypt|enc)\.key(?:[?#]|$)/i.test(url)) {
  setHeader("Content-Type", "application/octet-stream");
  console.log("media content-type set: application/octet-stream");
}

setHeader("Access-Control-Allow-Origin", "*");
setHeader("Access-Control-Allow-Headers", "*");
setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

$done({ headers });
