const express = require("express");
const app = express();
const port = 3010;

// 日志中间件，在所有请求进来都会执行
// 注意该中间的位置，代码数额写顺序会决定路由匹配逻辑后的执行顺序
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

// 如果在最后一个匹配到的中间件中没有结束请求，调用next会返回express默认错误页内容
app.get("/next", function (req, res, next) {
  next();
});

// 在已经结束了请求的中间件，调用next方法，还是会继续执行下一个中间件，但是该中间件内不能再有其它的内容响应，否则会报错
app.get(
  "/send-next",
  function (req, res, next) {
    res.send("hello world");
    next();
  },
  function () {
    console.log("我被next方法调用，请求虽然响应了，我还是可以执行");
  }
);

app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
