# 使用 node 实现 todoList 服务

使用 node 完成 todoList 服务其实比较简单，只需要在服务内部判断请求接口，然后实现对应逻辑就好。

```javascript
// todolist 后端服务
const http = require("http");

// 这里暂时存在内存，后面学了node-mysql，再将数据存在数据库中
const list = ["Html", "Css", "Javascript", "React", "Vue"];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // 开启跨域，允许接口从其它域请求过来
  // 设置跨域的域名，* 代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  // 设置跨域请求允许的Header头字段
  res.setHeader("Access-Control-Allow-Headers", "*");
  // 设置跨域请求允许的Methods头字段
  res.setHeader("Access-Control-Allow-Methods", "*");
  // 设置预检请求过期时间60秒
  res.setHeader("Access-Control-Max-age", "60");

  res.setHeader("Content-Type", "application/json;charset=utf-8");

  // 下面保存的接口不属于简单请求，会发送OPTIONS预检接口
  if (method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }
  if (method === "GET" && url === "/list") {
    res.end(JSON.stringify(list));
  } else if (method === "POST" && url === "/save") {
    // 接受客户端提交的信息
    let buffer = Buffer.from([]);
    req.on("data", function (chunk) {
      buffer = Buffer.concat([buffer, chunk]);
    });
    req.on("end", function () {
      const data = buffer.toString();
      list.push(JSON.parse(data).item);
      res.end(JSON.stringify(list));
    });
  } else if (method === "GET" && url.startsWith("/remove")) {
    const reqUrl = new URL(url, "http://localhost:7070");
    const id = reqUrl.searchParams.get("id");
    list.splice(id, 1);
    res.end(JSON.stringify(list));
  } else {
    res.end();
  }
});

server.listen(7070, () => {
  console.log("服务启动成功，地址为：http://localhost:7070");
});
```

## 测试&使用

1. NodeBase 目录下执行`node 06.todolist`;
2. NodeBase 目录下执行`node 05.web.server.js `

做完以上工作后，功能虽然实现了，但是也存在了几个问题：

- `createServer` 里面代码看着有点丑陋，并且业务越来越复杂不可能都在这里写逻辑吧，有没有什么方式可以优化一下？
- Cors 是什么？为什么要设置 Cors？
- 总结一下 node 有哪些方式可以获取 Get，Post 参数？
- 如何使用 RESTful 接口改造一下？

## 路由实现

`createServer` 里面将所有路径以及对应处理函数都放在一起了，这样代码臃肿且不易扩展。

解决方式就是将代码进行拆分：

- config.js 配置文件
- routers.js 定义路由配置文件
- controller/todolist.js todolist 功能具体实现
- controller/index.js 业务逻辑汇总入口文件
- index.js 项目启动文件

将项目中需要使用到的配置单独放置到配置文件中，方便后续管理。

```js
// config.js 文件定义应用配置
module.export = {
  port: 7070,
  apiBaseName: "/api",
  //...其它配置
};
```

提取 createServer 逻辑，实现通过 `method & pathName` 去查找 router 配置，并调用对应配置的处理逻辑。

```js
// index.js
const http = require("http");
const nUrl = require("url");
const config = require("./config");
const routers = require("./routers");
const middleware = require("./middleware");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const urlObj = nUrl.parse(url);
  const pathname = urlObj.pathname;
  // 查找路由
  const matchRoute = routers.find((route) => {
    return (
      route.method === method && config.apiBaseName + route.path === pathname
    );
  });
  // 中间件 - 跨域功能开启
  if (!middleware.cors(req, res)) return;

  if (matchRoute) {
    // 调用路由功能
    matchRoute.fn(req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
  res.end("404 Not Found");
});

server.listen(config.port, () => {
  console.log(`服务启动成功，地址为：http://localhost:${config.port}`);
});
```

添加路由配置文件:

```js
// routers.js
const controller = require("./controller");
module.exports = [
  {
    method: "GET",
    path: "/todolist/list",
    fn: controller.todolist.list,
  },
  {
    method: "POST",
    path: "/todolist/add",
    fn: controller.todolist.add,
  },
  {
    method: "GET",
    path: "/todolist/remove",
    fn: controller.todolist.remove,
  },
];
```

实现每个路由下的具体逻辑：

```js
// 这里暂时存在内存，后面学了node-mysql，再将数据存在数据库中
const list = ["Html", "Css", "Javascript", "React", "Vue"];

function getList(req, res) {
  res.end(JSON.stringify(list));
}

function add(req, res) {
  // 接受客户端提交的信息
  let buffer = Buffer.from([]);
  req.on("data", function (chunk) {
    buffer = Buffer.concat([buffer, chunk]);
  });
  req.on("end", function () {
    const data = buffer.toString();
    list.push(JSON.parse(data).data);
    res.end(JSON.stringify(list));
  });
}

function remove(req, res) {
  const reqUrl = new URL(req.url, "http://localhost:7070");
  const id = reqUrl.searchParams.get("id");
  list.splice(id, 1);
  res.end(JSON.stringify(list));
}

module.exports = { list: getList, add, remove };
```

## Cors 设置

因为前端页面和 api 服务在不同的端口上，存在着跨域请求的限制，所以需要设置跨域请求头，来允许其它不同源地址访问。

[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)是一种基于 HTTP 头的机制，该机制用于服务器标识除了它自己以外的其他域（协议，端口）是否能够访问自己的资源。

## node 如何获取 Get，Post 参数

### Get 参数

通过 req 拿到 url，然后解析 url 里面的 search 参数

实现 1：使用 URL 对象，拿到 searchParams 对象

```js
const urlObj = new URL(url, "http://localhost");
const searchParams = urlObj.searchParams;
const id = searchParams.id;
```

实现 2: 使用 node 内置 url 模块中的 parse 方法

```js
const urlObj = url.parse(url, true);
const id = urlObj.query.id;
```

### Post 参数

通过监听 data 事件获取 buffer 数据，再通过 end 事件在数据接受完之后处理数据

实现：

```js
// 初始化一个 buffer 容器
let buffer = Buffer.from([]);
req.on("data", (chunk) => {
  // 保存 buffer 数据
  buffer = Buffer.concat([buffer, chunk]);
});
req.on("end", () => {
  // 处理 buffer 数据，比如打印结果
  console.log(buffer.toString());
});
```

## RESTful 接口实现

借用[Path-to-RegExp](https://www.npmjs.com/package/path-to-regexp)库，可对 path 路径解析，实现 restful 规范。
