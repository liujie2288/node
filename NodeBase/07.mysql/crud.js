// 使用node与mysql完成CRUD操作

const { pool } = require('./db');


pool.getConnection(function (err, connection) {
  if (err) throw err;

  const queryByName = (name) => {
    let sql = "SELECT * FROM user";
    if (name) {
      sql = `SELECT * FROM user WHERE name = '${name}'`
    }
    connection.query(sql, function (error, results) {
      if (error) {
        console.log(error)
      } else {
        if (name) {
          console.log("通过`" + name + "`查询的数据为:", results);
        } else {
          console.log("查询到的全部数据为:", results);
        }
      }
    })
  }

  // 添加数据
  connection.query("INSERT INTO user (name,age) VALUES (?,?)", ["lucky", 8], function (error, results) {
    if (error) {
      console.log(error)
    } else {
      console.log("数据插入成功，插入后返回的结果为：");
      console.log(results);

    }
  })


  queryByName('lucky')



  // 修改数据
  connection.query("UPDATE user SET age = 9 WHERE name = 'lucky'", function (error, results) {
    if (error) {
      console.log(error)
    } else {
      console.log("修改修改成功，有" + results.affectedRows + "条数据被改变了");
      console.log(results);
    }
  })

  queryByName('lucky')


  // 删除数据
  connection.query("DELETE FROM user WHERE name = 'lucky'", function (error, results) {
    if (error) {
      console.log(error)
    } else {
      console.log("删除成功，有" + results.affectedRows + "条数据被改变了");
      console.log(results);
    }
  })


  queryByName()

})