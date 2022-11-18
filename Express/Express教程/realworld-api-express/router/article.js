const express = require("express");

const router = express.Router();

// 获取文章列表
router.get("/", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("get /articles");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
