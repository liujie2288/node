# node 中使用 mysql

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
