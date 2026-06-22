(function() {
  var url = (typeof $request !== "undefined" && $request.url) || "";
  var headers = (typeof $response !== "undefined" && $response.headers) || {};
  var status = (typeof $response !== "undefined" && $response.status) || "";
  var contentType = headers["Content-Type"] || headers["content-type"] || "";
  console.log("[91-debug][media] status=" + status + " type=" + contentType + " url=" + url);
  $notification.post("91 Debug 媒体命中", "status=" + status + " " + contentType, url.slice(0, 180));
  $done({});
})();
