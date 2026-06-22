// 91 video capture for Stash. Opens captured HLS links through the SSM player.
(function () {
  const url = ($request && $request.url) || "";
  const isVideo = /\.(?:m3u8|mp4)(?:[.?]|$)/i.test(url);
  const is91Host = /https?:\/\/[^/]*\.(?:ofpcif\.cn|hoicmy\.cn|ywbvrkwk\.cn|aybvvkglr\.com|fipxor\.cn|aozngkwm\.com|fnomellx\.cc|anpbbxdyo\.com)\/(?:watch|videos)/i.test(url);
  if (!isVideo || !is91Host) {
    return $done({});
  }

  const now = Date.now();
  const key = "ssm_91_last_notify_at";
  let last = 0;
  try {
    if (typeof $persistentStore !== "undefined") {
      last = Number($persistentStore.read(key) || 0);
    }
  } catch (_) {}

  if (last && now - last < 120000) {
    return $done({});
  }

  try {
    if (typeof $persistentStore !== "undefined") {
      $persistentStore.write(String(now), key);
    }
  } catch (_) {}

  const openUrl = "https://stash-manager.410079116.xyz/player?url=" + encodeURIComponent(url);
  $notification.post("91 视频链接捕获成功", "点击打开播放页", "", { url: openUrl });
  return $done({});
})();
