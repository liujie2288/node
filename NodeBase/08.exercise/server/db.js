const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "liujie",
  database: "yinuo_company",
});

module.exports = pool;
