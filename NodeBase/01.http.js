// 1. 引入nodejs内置http模块
const http = require("http");

// 2. 使用http模块创建服务
// req 代表请求信息对象，能够拿到url等信息
// res 代表响应信息对象，可以设置响应头，响应内容等
const app = http.createServer(function (req, res) {
  // 访问当前请求的url地址
  console.log(req.url);
  // 设置响应头信息
  // Content-Type：表示文件的类型，还有其它的比如：纯文本格式（text/plain）gif图片格式（image/gif）等
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  // 写入内容
  res.write("<h1 style='color:red'>你好，Nodejs</h1>");
  // 结束响应，数据发送完之后一定要结束响应，否则请求一直挂起，不能结束
  res.end();
});

// 3. 启动服务，开启监听端口
app.listen(3000, function () {
  // 服务启动成功的回调函数
  console.log("服务启动成功");
});

// 在终端运行程序：node 01.http.js
// 浏览器请求该服务器：http://localhost:3000
