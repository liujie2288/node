const mysql = require("mysql");

// 方式1: 创建于mysql的connntect对象，用户连接查询数据
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liujie",
  database: "test",
});

// 方式2: 创建连接池对象，用户连接查询数据（相比于方式1性能更好一点）
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liujie",
  database: "test",
})

connection.pool = pool;

module.exports = connection

