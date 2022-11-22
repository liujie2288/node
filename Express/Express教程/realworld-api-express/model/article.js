const mongoose = require("mongoose");
const baseModel = require("./base-model");

const articleSchema = new mongoose.Schema({
  ...baseModel,
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
  slug: {
    type: String,
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
  },
  author: {},
});

module.exports = articleSchema;
