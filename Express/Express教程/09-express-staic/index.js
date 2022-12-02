const path = require("path");
const express = require("express");

const app = express();

app.use(
  "/public",
  express.static(path.join(__dirname, "./public"), {
    // dotfiles: "allow", // 是否允许加载以 . 开头的文件和文件夹。默认为：ignore
    // index: "foo.html", // 设置默认首页
  })
);

// 托管node_modules目录
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "./node_modules"))
);

//
app.set("view engine", "ejs");
app.get("/", (req, res, next) => {
  res.render("index");
});
app.get("/a/b", (req, res, next) => {
  res.render("index");
});
app.get("/a/b/c", (req, res, next) => {
  res.render("index");
});

app.listen(3010, () => {
  console.log(`server start at http://localhost:3010`);
});
