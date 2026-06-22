(function() {
  var url = (typeof $request !== "undefined" && $request.url) || "";
  var status = (typeof $response !== "undefined" && $response.status) || "";
  var body = (typeof $response !== "undefined" && $response.body) || "";
  console.log("[91-debug][response] status=" + status + " len=" + body.length + " url=" + url);
  if (/api|line|ads|config|home|video|play/i.test(url)) {
    $notification.post("91 Debug 响应命中", "status=" + status + " len=" + body.length, url.slice(0, 180));
  }
  $done({});
})();
