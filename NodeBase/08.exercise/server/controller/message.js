const pool = require("../db");

// 获取留言板列表
function getMessage(req, res) {
  const { pn, pageSize } = req;
  pool.query("SELECT * FROM message", function (error, results) {
    let httpCode,
      message,
      data = null;
    if (error) {
      httpCode = 500;
      message = "服务器异常，查询失败";
    } else {
      httpCode = 200;
      data = results;
      message = "查询成功";
    }
    res.statusCode = httpCode;
    res.end(JSON.stringify({ data, message: message }));
  });
}

// 发送留言消息
function sendMessage(req, res) {
  const { userId, message } = res.body;
  res.setHeader("Content-type", "application/json;charset=utf-8");
  let httpCode,
    resMessage,
    data = null;
  if (!message) {
    httpCode = 422;
    resMessage = "留言内容不能为空";
  }
  if (resMessage) {
    res.statusCode = httpCode;
    res.end(JSON.stringify({ data, message: resMessage }));
    return;
  }

  pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      httpCode = 500;
      resMessage = "服务器错误，连接数据库失败";
    } else {
      connection.query(
        "INSERT INTO message(message,user_id) values(?,?,now())",
        [userId, message],
        function (error, results) {
          if (error) {
            httpCode = 500;
            message = "留言添加失败";
          } else {
            httpCode = 200;
            message = "留言添加成功";
            data = results.insertId;
          }
          res.statusCode = httpCode;
          res.end(JSON.stringify({ data, message: resMessage }));
        }
      );
    }

    connection.release();
  });
}

module.exports = {
  getMessage,
  sendMessage,
};
