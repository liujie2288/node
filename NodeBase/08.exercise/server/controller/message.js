const pool = require("../db");

// 获取留言板列表
async function getMessage(req, res) {
  let { pn = 1, pageSize = 10 } = req.body;
  const promisePool = pool.promise();
  try {
    let rows;
    [rows] = await promisePool.query("SELECT COUNT(*) as total FROM message");
    const total = rows[0]["total"];
    if (total > 0) {
      [rows] = await promisePool.query(
        "SELECT * FROM message ORDER BY id DESC LIMIT ?,?",
        [(pn - 1) * pageSize, pageSize * 1]
      );
    }
    res.status(200).json({
      data: {
        total,
        rows,
      },
      message: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// 发送留言消息
function sendMessage(req, res) {
  const { userId, message } = req.body;
  let httpCode,
    resMessage,
    data = null;
  if (!message) {
    httpCode = 422;
    resMessage = "留言内容不能为空";
  }
  if (resMessage) {
    res.status(httpCode).json({ data, message: resMessage });
    return;
  }

  pool.getConnection(function (error, connection) {
    if (error) {
      console.log(error);
      httpCode = 500;
      resMessage = "服务器错误，连接数据库失败";
    } else {
      connection.query(
        "INSERT INTO message(user_id,message,create_time) values(?,?,now())",
        [userId, message],
        function (error, results) {
          if (error) {
            console.log(error);
            httpCode = 500;
            resMessage = error.message;
          } else {
            httpCode = 200;
            resMessage = "留言添加成功";
            data = results.insertId;
          }
          res.status(httpCode).json({ data, message: resMessage });
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
