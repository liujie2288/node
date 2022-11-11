const path = require("path");
const express = require("express");
const app = express();

// 字符串路由路径
app.get("/", function (req, res) {
  res.send("root");
});

app.get("/about", function (req, res) {
  res.send("about");
});

// 字符串模式路由路径

app.get("/ab?cd", function (req, res) {
  res.send("ab?cd");
});

app.get("/ab+cd", function (req, res) {
  res.send("ab+cd");
});

app.get("/ab*cd", function (req, res) {
  res.send("ab*cd");
});

app.get("/ab(cd)?e", function (req, res) {
  res.send("ab(cd)?e");
});

// 正则表达式路由路径

app.get(/abc/, function (req, res) {
  res.send("/abc/");
});

app.get(/.*fly$/, function (req, res) {
  res.send("/.*fly$/");
});

// 路由参数

app.get("/flights/:from-:to", function (req, res) {
  res.send(req.params);
});

app.get("/user/:userId(\\d+)", function (req, res) {
  res.send(req.params);
});

// 响应方法

app.get("/send", function (req, res) {
  // 当使用send发送json数据时，和使用res.json发送json数据没区别
  res.send({ name: "liujie" });
});

app.get("/json", function (req, res) {
  res.json({ name: "liujie" });
});

// jsonp 跨域请求响应数据
app.get("/jsonp", function (req, res) {
  // 当访问：http://localhost:3010/jsonp?callback=foo时，
  // 返回 /**/ typeof foo === 'function' && foo({"name":"liujie"});
  res.jsonp({ name: "liujie" });
});

// 下载文件
app.get("/download", function (req, res) {
  res.download(path.join(__dirname, "package.json"));
});

// sendFile 根据文件类型设置 HTTP Content-Type 然后响应文件内容
app.get("/package", function (req, res) {
  res.sendFile(path.join(__dirname, "package.json"));
});

// 设置响应状态码，并将状态码对应的字符串含义作为响应体内容发送
app.get("/sendStatus", function (req, res) {
  res.sendStatus(422);
});




app.listen(3010, () => {
  console.log(`server start at http://localhost:3010`);
});
