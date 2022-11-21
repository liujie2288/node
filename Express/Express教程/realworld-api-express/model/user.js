const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const baseModel = require("./base-model");

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // 查询信息时过滤掉密码
    set(value) {
      return bcrypt.hashSync(value, 10);
    },
  },
  // 个人介绍
  bio: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = userSchema;
