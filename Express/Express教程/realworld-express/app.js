const path = require("path");
const express = require("express");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { sessionSecret, dbUri } = require("./config/config.default");
const router = require("./router");
require("./model");

// 从环境变量中读取PORT设置
// linux 设置环境变量并启动该node服务： PORT=4010
const PORT = process.env.PORT || 3010;

const app = express();

app.use(
  session({
    secret: sessionSecret, // 签发session id的密钥，可以通过uuid来随机生成
    resave: false,
    saveUninitialized: false,
    //session id 的cookie设置
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 过期时间，单位是毫秒
      // secure: true
    },
    // 持久化session数据
    store: MongoStore.create({
      mongoUrl: dbUri,
    }),
  })
);

app.use(function (req, res, next) {
  console.log(req.session.user);
  app.locals.sessionUser = req.session.user;
  next();
});

// 请求日志中间件
app.use(morgan("dev"));
// 接受应用内部请求的ajax接口
app.use(express.json());
app.use(express.urlencoded());

// 设置默认模版引擎
app.set("view engine", "ejs");
// 设置模版页面默认目录
app.set("views", path.join(__dirname, "./views"));

// 挂载路由
app.use(router);

// 静态资源处理
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "./node_modules"))
);

// 错误处理
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
