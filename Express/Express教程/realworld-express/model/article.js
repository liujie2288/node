const mongoose = require("mongoose");
const baseModel = require("./base-model");

const articleSchema = new mongoose.Schema({
  ...baseModel,
  // 处理后的文章标题，文章ID
  slug: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tagList: {
    type: [String],
  },
  // 是否收藏
  favorited: {
    type: Boolean,
  },
  // 收藏数量
  favoritesCount: {
    type: Number,
    default: 0,
  },
  // 不能直接存储用户信息，如果用户信息变了，其它使用了地方都得变，不合理
  // 存储用户ID，查询时使用 .populate 填充用户信息
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = articleSchema;
