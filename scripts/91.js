// 91 video capture for Stash. Adds original-site headers and opens captured links through the SSM player.
(function () {
  const url = ($request && $request.url) || "";
  const headers = Object.assign({}, ($request && $request.headers) || {});

  function setOriginalHeaders() {
    headers["Referer"] = "https://yypwa3.mhitlmok.cc/";
    headers["referer"] = "https://yypwa3.mhitlmok.cc/";
    headers["Origin"] = "https://yypwa3.mhitlmok.cc";
    headers["origin"] = "https://yypwa3.mhitlmok.cc";
  }

  const isVideo = /\.(?:m3u8|mp4)(?:[.?]|$)/i.test(url);
  const is91Host = /https?:\/\/[^/]*\.(?:ofpcif\.cn|hoicmy\.cn|ywbvrkwk\.cn|aybvvkglr\.com|fipxor\.cn|aozngkwm\.com|fnomellx\.cc|anpbbxdyo\.com)\/(?:watch|videos)/i.test(url);
  if (!isVideo || !is91Host) {
    return $done({});
  }

  setOriginalHeaders();

  const now = Date.now();
  const lastUrlKey = "ssm_91_last_notify_url";
  const lastAtKey = "ssm_91_last_notify_at";
  let lastUrl = "";
  let lastAt = 0;
  try {
    if (typeof $persistentStore !== "undefined") {
      lastUrl = $persistentStore.read(lastUrlKey) || "";
      lastAt = Number($persistentStore.read(lastAtKey) || 0);
    }
  } catch (_) {}

  if (lastUrl === url && lastAt && now - lastAt < 30000) {
    return $done({ headers });
  }

  try {
    if (typeof $persistentStore !== "undefined") {
      $persistentStore.write(url, lastUrlKey);
      $persistentStore.write(String(now), lastAtKey);
    }
  } catch (_) {}

  const openUrl = "https://stash-manager.410079116.xyz/player?url=" + encodeURIComponent(url);
  $notification.post("91 视频链接捕获成功", "点击打开播放页", "", { url: openUrl });
  return $done({ headers });
})();
