const express = require("express");
const auth = require("../middleware/auth");
const validator = require("../validator/article");
const articleCtrl = require("../controller/article");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

// // 创建文章
// router.post("/", auth(), validator.createArticle, articleCtrl.createArticle);

// // 获取文章
// router.get("/:articleId", validator.getArticle, articleCtrl.getArticle);

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
