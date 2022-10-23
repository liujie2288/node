
// nodejs与mysql的结合使用
const connection = require("./db");

// 开始连接
connection.connect((err) => {
  if (err) {
    console.log("Error en db: ", err);
    return;
  } else {
    console.log("Db ok");
  }
});

// sql查询
connection.query("SELECT * FROM user", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

// 结束连接
connection.end();


// === 使用连接池操作数据 ===
connection.pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!
  connection.query("INSERT INTO user(name,age) values(?,?)", ['lucky', 10], function (error, results, fields) {
    if (error) throw error;
    console.log("pool:", results);

    // 使用完后归还到连接池中
    connection.release();
    // 或者想要从连接池中移除
    // connection.destroy();
  })
})