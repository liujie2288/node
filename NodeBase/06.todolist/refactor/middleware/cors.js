module.exports = function (req, res) {
  // 开启跨域，允许接口从其它域请求过来
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 设置跨域请求允许的Header头字段
  res.setHeader("Access-Control-Allow-Headers", "*");
  // 设置跨域请求允许的Methods头字段
  res.setHeader("Access-Control-Allow-Methods", "*");
  // 设置预检请求过期时间60秒
  res.setHeader("Access-Control-Max-Age", "60");

  // 跨域接口可能回发送OPTIONS预检接口
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return false;
  }
  return true;
};
