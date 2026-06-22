// 91 media request header repair for Stash player playback.
(function () {
  const headers = Object.assign({}, ($request && $request.headers) || {});
  headers["Referer"] = "https://yypwa3.mhitlmok.cc/";
  headers["referer"] = "https://yypwa3.mhitlmok.cc/";
  headers["Origin"] = "https://yypwa3.mhitlmok.cc";
  headers["origin"] = "https://yypwa3.mhitlmok.cc";
  return $done({ headers });
})();
