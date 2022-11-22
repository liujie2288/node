const express = require("express");
const auth = require("../middleware/auth");
const validator = require("../validator/article");

const router = express.Router();

// 创建文章
router.post(
  "/",
  auth(),
  validator.createArticle,
  async function (req, res, next) {
    try {
      // 逻辑处理
      res.send("post /articles");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
