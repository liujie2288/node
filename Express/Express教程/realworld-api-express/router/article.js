const express = require("express");
const auth = require("../middleware/auth");
const validator = require("../validator/article");
const articleCtrl = require("../controller/article");

const router = express.Router();

// 创建文章
router.post("/", auth(), validator.createArticle, articleCtrl.createArticle);

// 获取文章
router.get("/:articleId", validator.getArticle, articleCtrl.getArticle);

module.exports = router;
