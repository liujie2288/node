const express = require("express");
const app = express();

// ==============  应用程序中间件开始 ==============
/*
// 应用程序中间件，不关系请求路径
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
});

// 限定请求路径
app.use("/user/:id", function (req, res, next) {
  console.log("Request Type:", req.method);
  next();
});

// 限定请求路径和请求方法
app.get("/user/:id", function (req, res, next) {
  res.send("USER");
});

// 挂载了一系列的中间件函数，形成一个中间件子堆栈
app.use(
  "/product/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    // 这里的next代表的是下面获取`Request Type`的中间件函数
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  }
);

// 为同一个路径定义多个处理中间件
app.get(
  "/product/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("product Info");
  }
);

// 这里不会被执行，因为上面已经结束请求了
app.get("/product/:id", (req, res, next) => {
  res.send(req.params.id);
});

// 为同一个路径定义多个处理中间件
app.get(
  "/category/:id",
  (req, res, next) => {
    // 为0时，调用下一个路由中间件
    if (req.params.id == "0") next("route");
    // 否则调用堆栈中的下一个中间件
    else next();
  },
  (req, res, next) => {
    res.send("category Info");
  }
);

// 这里只有当id为0时，才会执行
app.get("/category/:id", (req, res, next) => {
  res.send(req.params.id);
});

*/
// ==============  应用程序中间件结束 ==============

// ==============  路由中间件开始 ==============

/*
const router = express.Router();

router.use(function (req, res, next) {
  console.log("我是router中间件，我在进入router里面的任何请求都会执行");
  next();
});

// 该中间件形成路由子堆栈，该中间件没有指定请求方法，在请求路径为`/user/:id`都会执行
router.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

// 一个处理get请求，路径为`/user:id`的中间件堆栈

router.get(
  "/user/:id",
  function (req, res, next) {
    // 如果路径参数ID为0，调到下一个路由中间件
    if (req.params.id === "0") next("route");
    // 否则执行该子堆栈的下一个中间件，也就是执行下面返回`regular`的中间件函数
    else next();
  },
  function (req, res, next) {
    // render a regular page
    res.send("regular");
  }
);

// 处理上面将get请求路径为"/user/0"的请求
router.get("/user/:id", function (req, res, next) {
  console.log(req.params.id);
  res.send("special");
});

app.use("/router", router);

const router1 = express.Router();

router1.use(function (req, res, next) {
  if (!req.headers["x-auth"]) return next("router");
  next();
});

router1.get("/category/:id", function (req, res) {
  res.send("category info!");
});

app.use("/admin", router1, function (req, res) {
  res.status(401).end("dd");
});
*/
// ==============  路由中间件结束 ==============

// ==============  错误处理中间件开始 ==============

/*

// 同步错误会被express自动捕获
app.get("/error", (req, res) => {
  throw new Error("BROKEN");
});

// 异步错误需要传递给next函数
app.get("/error-async", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});

// 注册自定义错误处理中间件
app.use((error, req, res, next) => {
  console.log(error.stack);
  res.status(500).end(error.message);
});

*/

// ==============  错误处理中间件开始 ==============

// ==============  404中间件开始 ==============

/*
app.use(function (req, res) {
  res.send("404 page");
});
*/

// ==============  404中间件结束 ==============

// ==============  内置中间件开始 ==============
const path = require("path");
// app.use(express.static(path.join(__dirname, "public")));
// 挂载一个虚拟路由/static
app.use("/static", express.static(path.join(__dirname, "public")));

// ==============  内置中间件结束 ==============

app.listen(3010, () => {
  console.log(`server start at http://localhost:3010`);
});
