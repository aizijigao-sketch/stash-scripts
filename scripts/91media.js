(function() {
  var url = ($request && $request.url) || "";
  var headers = Object.assign({}, ($response && $response.headers) || {});
  function setHeader(name, value) {
    headers[name] = value;
    headers[name.toLowerCase()] = value;
  }
  if (/\.m3u8(?:\?|$)/i.test(url)) {
    setHeader("Content-Type", "application/vnd.apple.mpegurl");
  } else if (/\.ts(?:\?|$)/i.test(url)) {
    setHeader("Content-Type", "video/mp2t");
  } else if (/(?:crypt|enc)\.key(?:\?|$)/i.test(url)) {
    setHeader("Content-Type", "application/octet-stream");
  }
  setHeader("Access-Control-Allow-Origin", "*");
  setHeader("Access-Control-Allow-Headers", "*");
  setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  $done({ headers: headers });
})();
