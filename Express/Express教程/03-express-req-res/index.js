const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3010;

app.get("/user/:id", (req, res) => {
  const url = req.url;
  const originalUrl = req.originalUrl;
  const method = req.method;
  const ip = req.ip;
  const hostname = req.hostname;
  const params = req.params;
  const fresh = req.fresh;

  res
    .status(200)
    .send({ data: { url, originalUrl, method, ip, hostname, params, fresh } });
});

app.use(cookieParser());

app.get("/cookie", function (req, res) {
  const cookies = req.cookies;
  res.cookie("foo", "bar");
  res.status(200).json({ data: cookies });
});

app.get("/download", function (req, res) {
  res.status(200).download("./package.json", "package.json");
});

app.get("/redirect", function (req, res) {
  res.redirect("/user/2");
});

app.get("/links", function (req, res) {
  res
    .links({
      next: "http://api.example.com/users?page=2",
      last: "http://api.example.com/users?page=5",
    })
    .end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
