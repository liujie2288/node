// 这里是一个静态服务器，可以使用静态资源的加载
const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    let url = req.url;
    url = url === "/" ? "index.html" : url;
    if (url !== "/favicon.ico") {
      const absPath = path.join(__dirname, "./static/" + url);
      const extName = path.extname(absPath);
      fs.access(absPath, fs.constants.F_OK, function (error) {
        let data = "";
        if (error) {
          data = fs.readFileSync(path.join(__dirname, "./static/404.html"));
        } else {
          data = fs.readFileSync(absPath);
        }
        res.writeHead(200, {
          "Content-Type": getExt(extName) + "; charset=utf-8",
        });
        res.write(data);
        res.end();
      });
    } else {
      res.end();
    }
  })
  .listen(7777, function () {
    console.log("服务启动成功，请访问http://localhost:7777");
  });

// 获取后缀名
// 想要更多mime类型，npm搜索mime库
function getExt(extName) {
  switch (extName) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/js";
    case ".png":
      return "image/png";
    default:
      return "text/html";
  }
}
