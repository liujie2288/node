const express = require("express");
const auth = require("../middleware/auth");
const validator = require("../validator/article");
const articleCtrl = require("../controller/article");

const router = express.Router();

// 显示创建文章页面
router.get("/editor", auth(), articleCtrl.showCreateArticle);

// 创建文章
router.post(
  "/createArticle",
  auth(),
  validator.createArticle,
  articleCtrl.createArticle
);

// 显示文章页面
router.get(
  "/article/:articleId",
  validator.getArticle,
  articleCtrl.showArticle
);

// // 获取所有文章
// router.get("/", articleCtrl.getAllArticle);

// // 更新文章
// router.put(
//   "/:articleId",
//   auth(),
//   validator.updateArticle,
//   articleCtrl.updateArticle
// );

// // 删除文章
// router.delete(
//   "/:articleId",
//   auth(),
//   validator.deleteArticle,
//   articleCtrl.deleteArticle
// );

module.exports = router;
