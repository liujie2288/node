# 使用 Express 开发接口服务

实现 [realword](https://github.com/gothinkster/realworld) 项目后端[接口规范](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)的接口服务。

> realword 是一个示例应用，它演示了如何使用不同的前/后端技术（react，angulare，Node，Django 等）完成示例应用的开发。[有超过 100 中不同语言，框架，库的实现](https://codebase.show/projects/realworld)

## 创建项目

1. 创建项目文件夹

```shell
mkdir realworld-api-express
cd realworld-api-express
npm init -y
yarn add express
```

2. 创建项目目录结构

```shell
├── config	# 项目配置文件
│   └── config.default.js # 项目默认配置
├── controller	# 用于解析用户的输入，处理后返回相应的结果
├── model	# 数据持久层（比如对用户，文章的数据库操作）
├── middleware	# 用于编写中间件（管理项目通用中间件）
├── router	# 用于配置 URL 路由规则
├── util	# 工具模块（封装常用的辅助工具函数）
└── app.js	# 用于自定义启动时的初始化工作
```

3. 编写项目启动入口文件 app.js

```js
const express = require("express");

// 从环境变量中读取PORT设置
const PORT = process.env.PORT || 3010;

const app = express();

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
```

> linux 设置环境变量并启动该 node 服务： PORT=4010 node app.js
> window 设置环境变量并启动该 node 服务： SET PORT=4010 node app.js

项目创建完毕后启动服务，然后使用 postman 或者 apifox 测试服务启动成功并成功响应。

## 配置常用中间件

1. 配置解析请求体中间件

支持客户端 JSON 数据格式请求体：

```js
app.use(express.json());
```

配置成功后，可以通过`req.body`获取客户端递交的 json 数据

支持客户端表单数据格式请求体：

```js
app.use(express.urlencoded());
```

配置成功后，可以通过`req.body`获取客户端递交的 表单 数据

2. 配置日志输出中间件，输出每个请求基本信息以及响应信息

```js
app.use(morgan("dev"));
```

配置后，控制台将输出类似：

POST / 200 18.183 ms - 17
[请求方法][请求路径][请求响应状态码][请求耗时][请求响应内容长度]

3. 为客户端提供跨域资源请求

```js
app.use(cors());
```

配置成功后，会自动为响应头信息设置`Access-Control-Allow-Origin：*`。

完成以上步骤配置后的入口文件 app.js 代码：

```js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3010;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.send("hello world");
});

app.post("/", function (req, res) {
  res.send(req.body);
});

app.listen(PORT, function () {
  console.log(`server start at http://localhost:${PORT}`);
});
```

## 路由设计

> 参考官方文档说明: https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints

为了防止入口文件随着路由功能的添加变得臃肿，以及更加清晰的管理路由功能，我们可以将路由拆分到单独的模块中，每一类相关的功能（用户，文章等）放到一个单独的文件中。文件结构如下：

```shell
├── user.js	# 用户相关模块
├── article.js	# 文章相关模块
├── xxxx.js	# 其它路由文件模块
└── index.js	# 路由入口文件，绑定各个模块路由功能
```

1. 路由功能模块创建

```js
const express = require("express");

const router = express.Router();

// 用户登录功能
router.post("/users/login", async function (req, res, next) {
  try {
    // 登录逻辑处理
  } catch (error) {
    next(error);
  }
});

// ... 其它用户相关接口，参考realworld文档，比如：注册，获取当前用户信息等

module.exports = router;
```

以上为路由功能模块示例代码，其它的路由模块（比如用户资料，文章等）都是类似结构，只需要按照 realworld 接口规范完成功能路由注册。完成后，我们的应该有以下几个路由文件：

**user.js 路由文件：**

```js
const express = require("express");

const router = express.Router();

// 用户登录
router.post("/users/login", async function (req, res, next) {
  try {
    // 登录逻辑处理
    res.send("post /users/login");
  } catch (error) {
    next(error);
  }
});

// 用户注册
router.post("/users", async function (req, res, next) {
  try {
    // 注册逻辑处理
    res.send("post /users");
  } catch (error) {
    next(error);
  }
});

// 获取当前的登录用户
router.get("/user", async function (req, res, next) {
  try {
    // 获取当前的登录用户逻辑处理
    res.send("get /user");
  } catch (error) {
    next(error);
  }
});

// 更新用户
router.put("/user", async function (req, res, next) {
  try {
    // 更新用户逻辑处理
    res.send("put /user");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

**profile.js 路由文件：**

```js
const express = require("express");

const router = express.Router();

// 根据用户名获取用户资料
router.get("/:username", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("get /profiles/:username");
  } catch (error) {
    next(error);
  }
});

// 关注用户
router.post("/:username/follow", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("get /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
});

// 取消关注
router.delete("/:username", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("delete /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

2. 将路由功能模块挂载到路由入口`router/index.js`中：

```js
const express = require("express");

const router = express.Router();

// 用户路由相关
router.use(require("./user"));

// 个人信息路由相关
router.use("/profiles", require("./profile"));

module.exports = router;
```

3. 将路由入口挂在到 app 中，删除创建项目时添加的路由功能：

```js
// app.js文件中

// 引入路由入口模块
const router = require("./router");

// 挂在路由中间件，baseUrl为 api
app.use("/api", router);
```

## 路由逻辑处理

当把路由和路由对应的逻辑处理函数放到一起时，会存在两个问题：

1. 当处理逻辑比较多时，路由模块文件变得很大
2. 不能很好的通过中间件来组织路由之间的相同的处理逻辑

所以，当应用如果比较复杂时，推荐将处理代码和路由分开，将处理函数单独封装放到 controller 目录下单独的模块中。文件结构如下：

```shell
├── user.js	# 用户相关处理函数模块
├── articles.js	# 文章相关处理函数模块
├── xxxx.js	# 其它处理函数模块
```

将`router/user.js`文件中的处理函数提取到`controller/user.js`中：

**controller/user.js** 文件内容如下：

```js
// 用户登录
exports.login = async function (req, res, next) {
  try {
    // 登录逻辑处理
    res.send("post /users/login");
  } catch (error) {
    next(error);
  }
};

// 用户注册
exports.register = async function (req, res, next) {
  try {
    // 注册逻辑处理
    res.send("post /users");
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息
exports.getCurrentUser = async function (req, res, next) {
  try {
    // 获取当前的登录用户逻辑处理
    res.send("get /user");
  } catch (error) {
    next(error);
  }
};

// 更新当前用户信息
exports.updateCurrentUser = async function (req, res, next) {
  try {
    // 更新用户逻辑处理
    res.send("put /user");
  } catch (error) {
    next(error);
  }
};
```

**router/user.js** 文件内容如下：

```js
const express = require("express");
const userCtrl = require("../controller/user");

const router = express.Router();

// 用户登录
router.post("/users/login", userCtrl.login);

// 用户注册
router.post("/users", userCtrl.register);

// 获取当前的登录用户
router.get("/user", userCtrl.getCurrentUser);

// 更新用户
router.put("/user", userCtrl.updateCurrentUser);

module.exports = router;
```

除了 user.js 模块，其它路由模块也同上述一样做相同的处理。

## 配置统一的错误处理中间件

在上面路由处理函数中，通过 try catch 捕获异常后传递给了 next 函数，这里我们可以自定义应用错误处理函数。

在 middleware 目录下新建 error-handle.js 文件：

```js
module.exports = () => {
  return (error, req, res, next) => {
    res.status(500).json({ error: error.toString() });
  };
};
```

注： 直接发送 error 时会出现`{}`，可以通过`error.toString()`或者 `node:util.format()`方法格式化 error，然后再返回给客户端。

在 app.js 中挂载错误处理中间件：

```js
const errorHandler = require("./middleware/error-handle");

app.use(errorHandler());
```

## 接口实现 - 前置准备

### 环境依赖

- 搭建[Mongodb](../../../SQL/Mongodb/README.md)数据库
- 安装[Mongoose](../../../SQL/Mongoose/README.md)工具包（以对象模型操作 mongodb 的工具包）

### 数据操作文件初始化

为了方便对每个模型单独管理，可以将模型拆分到单独文件中。

```shell
├── user.js	# 用户
├── articles.js	#
├── xxxx.js	#
├── index.js	# model入口文件，用户连接数据库和导出schema
```

`model/index.js`初始化数据库连接以及导出各个模块 model。

```js
// model/index.js
const mongoose = require("mongoose");

main().catch((err) => console.log("MongoDB数据库错误", err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/realworld");

  console.log("MongoDB 数据库连接成功");
}

module.exports = {
  User: mongoose.model("user", require("./user")),
  //...
};
```

### 接口实现思路

实现接口服务一般会有以下几个操作：

1. 获取请求体数据
2. 数据验证
   1. 基本数据验证（例如，是否包含必须字段，字段格式是否正确等）
   2. 业务数据验证（例如，用户名是否重复等）
3. 验证通过后，将数据保存到数据库
4. 发送成功响应

## 实现用户注册
