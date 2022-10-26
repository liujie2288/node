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

module.exports = { register };
