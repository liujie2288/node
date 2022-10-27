# 使用原生 node 开发企业官网

- [使用原生 node 开发企业官网](#使用原生-node-开发企业官网)
  - [项目初始化](#项目初始化)
  - [注册](#注册)
    - [表设计](#表设计)
    - [服务端代码实现](#服务端代码实现)
    - [问题](#问题)
  - [登录](#登录)
    - [服务端实现](#服务端实现)
  - [留言板](#留言板)
    - [功能实现](#功能实现)

## 项目初始化

企业官网静态文件存放在`web`目录中（html，css 不是文章重点，这里直接下载的模版）。
服务端文件存放在`server`目录中。项目结构采用`todolist/refactor`的结构示例。

```
|- server
|-- controller // 控制器文件夹，实现路由具体功能
|---- login.js // 实现登录功能
|---- register.js // 实现注册功能
|---- index.js // 控制器入口
|-- midderware // 中间件文件夹
|---- cors.js // 跨域中间件
|---- index.js // 中间件入口
|-- config.js  // 服务配置文件，端口号，BaseName，...
|-- index.js // 服务入口
|-- routers // 路由列表
```

## 注册

### 表设计

数据库设计`user`表：

| 名            | 类型     | 长度 | 键     |
| ------------- | -------- | ---- | ------ |
| id            | int      | 11   | 主键   |
| user_name     | varchar  | 255  | 唯一键 |
| user_password | varchar  | 255  |        |
| create_time   | datetime |      |        |

```sql
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

用户表里面主要记录四个信息，`用户id`，`用户名`，`用户密码`以及`创建时间`。

`用户ID`是唯一且自增的，我们把它设为主键。
`用户名`在系统中不能重复，我们把它设置为唯一建。

### 服务端代码实现

1. 获取到到客户端提交的数据
2. 对数据进行校验
3. 向数据库中插入数据

```javascript
// 密码加密工具包
const bcrypt = require("bcrypt");
// mysql数据库连接实例
const pool = require("../db");
function register(req, res) {
  // 1. 获取到到客户端提交的数据
  const body = req.body;
  const username = body.username; // 用户名
  const password = body.password; // 密码

  res.setHeader("content-type", "aplication/json;charset=utf-8");

  // 2. 对数据进行校验
  let validateMsg = "";
  if (!username) {
    validateMsg = "注册失败，用户名为空。";
  } else if (!password) {
    validateMsg = "注册失败，密码为空！";
  } else if (username.length > 10) {
    validateMsg = "注册失败，用户名过长！";
  }

  if (validateMsg) {
    res.statusCode = 422;
    res.end(
      JSON.stringify({
        data: null,
        validateMsg,
      })
    );
    return;
  }

  // 3. 向数据库中插入数据
  pool.getConnection(async function (error, connection) {
    if (error) throw error;

    try {
      pool.query(
        "INSERT INTO  user(username,password) values(?,?)",
        [username, bcrypt.hashSync(password, 10)],
        function (err, result) {
          let message,
            statusCode,
            data = null;
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              message = "注册失败，用户名重复";
            } else {
              message = "注册失败";
            }
            statusCode = 422;
          } else {
            statusCode = 200;
            message = "注册成功";
            data = result.insertId;
          }
          res.statusCode = statusCode;
          res.end(
            JSON.stringify({
              data,
              message,
            })
          );
        }
      );
    } catch (error) {
      connection.release();
    }
  });
}
```

在上面的代码中，保存数据时使用了`bcrypt`的工具包（用于专门加密密码）将密码加密后再存入数据库。

可能有小伙伴会疑惑，[为什么密码需要加密？为什么不使用 md5 来加密？](../../NodeAdvance/password-crypt.md)

### 问题

1. 注册时如何对密码加密。
2. jwt 鉴权
3. 验证码的实现

## 登录

### 服务端实现

1. 获取到到客户端提交的数据
2. 根据提交的用户名去数据库查询该用户信息
3. 如果查询到用户信息，比对用户密码与提交的密码是否一致

```javascript
// 密码加密工具包
const bcrypt = require("bcrypt");
// mysql数据库连接实例
const pool = require("../db");

function login(req, res) {
  // 1. 获取到到客户端提交的数据
  const body = req.body;
  const userName = body.username;

  res.writeHead(200, { "content-type": "aplication/json;charset=utf-8" });

  // 2. 根据提交的用户名去数据库查询该用户信息
  pool.query(
    "SELECT * FROM user WHERE username = ?",
    [userName],
    function (err, result) {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ data: null, message: "服务器异常" }));
      } else {
        const entity = result[0];
        let statusCode,
          message,
          data = null;
        // 3. 如果查询到用户信息，比对用户密码与提交的密码是否一致
        if (bcrypt.compareSync(body.password, entity.password)) {
          statusCode = 200;
          message = "登录成功";
          data = { id: entity.id, username: entity.username };
        } else {
          statusCode = 403;
          message = "账号或密码错误";
        }
        res.statusCode = statusCode;
        res.end(JSON.stringify({ data, message }));
      }
    }
  );
}
```

## 留言板

用户点击留言板时，如果用户已经登录则显示留言版页面，否则跳转到登录页。

留言板功能项：

1. 获取留言内容：调用`getMessage`接口，分页返回留言信息。
2. 提交留言内容：调用`sendMessage`接口，将用户名，用户 ID，留言内容发送给后端。

![留言板功能梳理](./img/message-board.png)

数据库设计`message`表

| 名          | 类型     | 长度 | 键   |
| ----------- | -------- | ---- | ---- |
| id          | int      | 11   | 主键 |
| message     | varchar  | 255  |
| user_id     | varchar  | 255  | 外键 |
| create_time | datetime |

### 功能实现
