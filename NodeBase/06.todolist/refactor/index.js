// todolist 后端服务
const http = require("http");
const nUrl = require("url");
const { match } = require("path-to-regexp");
const config = require("./config");
const routers = require("./routers");
const middleware = require("./middleware");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const urlObj = nUrl.parse(url);
  const pathname = urlObj.pathname;

  const getPathMatch = (routePath) =>
    match(config.apiBaseName + routePath)(pathname);
  // 查找路由
  const matchRoute = routers.find((route) => {
    return route.method === method && getPathMatch(route.path);
  });
  // 中间件 - 跨域功能开启
  if (!middleware.cors(req, res)) return;

  if (matchRoute) {
    const { params } = getPathMatch(matchRoute.path);
    // 为req对象添加解析的params对象
    req.params = params;
    // 调用路由功能
    matchRoute.fn(req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
  res.end("404 Not Found");
});

server.listen(config.port, () => {
  console.log(`服务启动成功，地址为：http://localhost:${config.port}`);
});
