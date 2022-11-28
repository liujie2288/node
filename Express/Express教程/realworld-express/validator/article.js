const { body } = require("express-validator");
const validate = require("../middleware/validate");
const validateUtil = require("../util/validate");

exports.createArticle = validate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空"),
]);

exports.getArticle = validate([
  validateUtil.isValidObjectId(["params"], "articleId"),
]);

exports.updateArticle = exports.getArticle;

exports.deleteArticle = exports.updateArticle;
