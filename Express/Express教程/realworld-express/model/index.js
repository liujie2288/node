const mongoose = require("mongoose");
const { dbUri } = require("../config/config.default");

main().catch((err) => console.log("MongoDB数据库连接失败", err));

async function main() {
  await mongoose.connect(dbUri);

  console.log("MongoDB 数据库连接成功");
}

// 组织导出模型类
module.exports = {
  User: mongoose.model("user", require("./user")),
  Article: mongoose.model("article", require("./article")),
};
