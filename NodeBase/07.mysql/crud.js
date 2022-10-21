// 使用node与mysql完成CRUD操作

const connection = require('./db');

// 添加数据
connection.query("INSERT INTO user (name,age) VALUES (?,?)", ["lucky", 8], function (error, results) {
  if (error) {
    console.log(error)
  } else {
    console.log(results);
    console.log("数据插入成功");
  }
})

// 修改数据
connection.query("UPDATE user SET age = 9 WHERE name = 'lucky'", function (error, results) {
  if (error) {
    console.log(error)
  } else {
    console.log(results);
    console.log("修改修改成功，有" + results.affectedRows + "条数据被改变了");
  }
})


connection.end();