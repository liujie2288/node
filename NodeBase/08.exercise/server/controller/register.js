const pool = require("../db");
function register(req, res) {
  const body = req.body;
  const username = body.username; // 用户名
  const password = body.password; // 密码

  res.setHeader("content-type", "aplication/json;charset=utf-8");

  // 数据校验
  if (!username) {
    res.statusCode = 500;
    // 用户名为空
    res.end(
      JSON.stringify({
        data: null,
        message: "注册失败，用户名为空。",
      })
    );
    return;
  } else if (!password) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        data: null,
        message: "注册失败，密码为空！",
      })
    );
    return;
  } else if (username.length > 10) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        data: null,
        message: "注册失败，用户名过长！",
      })
    );
    return;
  }

  pool.getConnection(async function (error, connection) {
    if (error) throw error;

    try {
      // 用户名判断重复
      await new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM user WHERE username = ?",
          [username],
          function (err, result) {
            if (result.length > 0) {
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  data: null,
                  message: "注册失败，用户名重复",
                })
              );
              reject();
            } else {
              resolve();
            }
          }
        );
      });

      pool.query(
        "INSERT INTO  user(username,password) values(?,?)",
        [username, password],
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                data: result.insertId,
                message: "注册成功",
              })
            );
          }
        }
      );
    } catch (error) {
      connection.release();
    }
  });
}

module.exports = { register };
