const { body } = require("express-validator");
const validate = require("../middleware/validate");

exports.createArticle = validate([
  body("article.title").notEmpty().withMessage("文章标题不能为空"),
  body("article.description").notEmpty().withMessage("文章摘要不能为空"),
  body("article.body").notEmpty().withMessage("文章内容不能为空"),
]);

exports.getArticle = validate([
  validate.isValidObjectId(["params"], "articleId"),
]);

// 2.  文章跟新的参数如何验证的

exports.updateArticle = validate([
  validate.isValidObjectId(["params"], "articleId"),
  body("article").custom((article) => {
    if (!article || (!article.title && !article.body && !article.description)) {
      throw new Error("缺少参数");
    }
    return true;
  }),
]);
