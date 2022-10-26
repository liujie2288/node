// 密码加密工具包
const bcrypt = require("bcrypt");
// mysql数据库连接实例
const pool = require("../db");

function login(req, res) {
  // 1. 获取到到客户端提交的数据
  const body = req.body;
  const userName = body.username;

  res.writeHead(200, { "content-type": "aplication/json;charset=utf-8" });

  // 2. 根据提交的用户名去数据库查询该用户信息
  pool.query(
    "SELECT * FROM user WHERE username = ?",
    [userName],
    function (err, result) {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ data: null, message: "服务器异常" }));
      } else {
        const entity = result[0];
        let statusCode,
          message,
          data = null;
        // 3. 如果查询到用户信息，比对用户密码与提交的密码是否一致
        if (bcrypt.compareSync(body.password, entity.password)) {
          statusCode = 200;
          message = "登录成功";
          data = { id: entity.id, username: entity.username };
        } else {
          statusCode = 403;
          message = "账号或密码错误";
        }
        res.statusCode = statusCode;
        res.end(JSON.stringify({ data, message }));
      }
    }
  );
}

module.exports = { login };
