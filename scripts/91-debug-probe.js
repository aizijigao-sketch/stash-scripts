(function() {
  var url = (typeof $request !== "undefined" && $request.url) || "";
  var method = (typeof $request !== "undefined" && $request.method) || "GET";
  console.log("[91-debug][request] " + method + " " + url);
  if (/91|api|line|m3u8|mp4|play|video|upload|ads/i.test(url)) {
    $notification.post("91 Debug 请求命中", method, url.slice(0, 180));
  }
  $done({});
})();
