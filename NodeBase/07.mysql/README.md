# node 中使用 mysql

## 基础使用

1. 安装 mysql 服务器

- 官网下载 [mysql 社区版](https://dev.mysql.com/downloads/mysql/)，然后一步安装就行。[参考地址](https://blog.csdn.net/qq_30101647/article/details/121339098)
- mac 也可以通过 homebrew 安装。`brew install mysql`。

2. 安装 mysql 的 nodejs 驱动程序

```bash
npm install mysql
```

3. 连接数据库

```js
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liujie",
  database: "test",
});

// 开始连接
connection.connect();

// sql查询
connection.query("SELECT * FROM user", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

// 结束连接
connection.end();
```

## 创建连接池

在开发 web 应用程序时，连接池是一个很重要的概念。建立一个数据库连接所消耗的性能成本是很高的。在服务器应用程序中，如果为每一个接收到的客户端请求都建立一个或多个数据库连接，将严重降低应用程序性能。
因此在服务器应用程序中通常需要为多个数据库连接创建并维护一个连接池，当连接不再需要时，这些连接可以缓存在连接池中，当接收到下一个客户端请求时，从连接池中取出连接并重新利用，而不需要再重新建立连接。

> [维基百科关于连接池的介绍](https://en.wikipedia.org/wiki/Connection_pool)

1. mysql 创建连接池：

```js
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liujie",
  database: "test",
});
```

2. 从连接池中取出连接

```js
.getConnection(function (err, connection) {
  if (err) throw err; // not connected!
  // 使用connection 做任何事
  // connection.query('SELECT * FROM user',function(error, results, fields){})
})
```

3. 使用完后需要归还到连接中或者从连接中移除。

```js
connection.release();
// connection.destroy();
```

4. 当一个连接池不再使用时，关闭连接池。

```js
poll.end();
```
