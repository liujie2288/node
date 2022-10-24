const pool = require("../db");
function login(req, res) {
  // 接受传入的username和password
  const body = req.body;
  const userName = body.username;

  pool.query(
    "SELECT * FROM user WHERE username = ?",
    [userName],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const entity = result[0];
        res.writeHead(200, { "content-type": "aplication/json;charset=utf-8" });
        if (body.password === entity.password) {
          res.end(
            JSON.stringify({ code: 200, data: null, message: "登录成功" })
          );
        } else {
          res.end(
            JSON.stringify({ code: 403, data: null, message: "账号或密码错误" })
          );
        }
      }
    }
  );
}

module.exports = { login };
