const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handle");

// 从环境变量中读取PORT设置
// linux 设置环境变量并启动该node服务： PORT=4010
const PORT = process.env.PORT || 3010;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// 挂在路由
app.use("/api", router);

// 挂在统一处理服务端错误中间件
app.use(errorHandler());

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
