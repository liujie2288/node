const path = require("path");
const fs = require("fs");
const express = require("express");
const ejs = require("ejs");

const app = express();

app.get("/", function (req, res) {
  fs.readFile(
    path.join(__dirname, "views/index1.html"),
    "utf-8",
    function (error, data) {
      if (error) {
        return res.status(404).send("404 Not Fond");
      }
      // 数据
      const todoItems = ["吃饭", "睡觉", "打豆豆"];
      // 拼装模版
      const todoItemsStr = todoItems.reduce((str, cur) => {
        return (str += `<li>${cur}</li>`);
      }, "");
      // 发挥响应
      res.status(200).send(data.replace("#placeholder#", todoItemsStr));
    }
  );
});

app.get("/ejs", function (req, res) {
  // 使用方式1: let template = ejs.compile(str, options); template(data);
  // 使用方式2: ejs.render(str, data, options);
  // 更多用法请参考ejs官方 https://ejs.co/
  ejs.renderFile(
    path.join(__dirname, "views/index.ejs"),
    {
      todos: ["吃饭", "睡觉", "打豆豆"],
    },
    function (error, str) {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send(str);
    }
  );
});

// app.set("views", "./view");  // 修改模版目录地址
app.set("view engine", "ejs");
app.get("/express-ejs", function (req, res) {
  // 省略了文件后缀ejs
  res.render("index", {
    todos: ["吃饭", "睡觉", "打豆豆"],
  });
});

app.listen(3010, () => {
  console.log(`server start at http://localhost:3010`);
});
