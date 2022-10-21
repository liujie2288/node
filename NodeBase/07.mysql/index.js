
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