const { Article, User } = require("../model");

// 创建文章
exports.createArticle = async function (req, res, next) {
  try {
    const article = new Article(req.body.article);
    // 设置当前文章作者为当前用户
    article.author = req.user._id;
    // 填充用户信息，返回给客户端
    article.populate("author");
    await article.save();
    res.status(200).json({
      article: article,
    });
  } catch (error) {
    next(error);
  }
};

// 获取文章
exports.getArticle = async function (req, res, next) {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      "author"
    );
    if (article) {
      res.status(200).json({
        article: article,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

// 获取所有文章
exports.getAllArticle = async function (req, res, next) {
  try {
    const filter = {};
    const { author, limit = 20, offset = 0 } = req.query;
    if (author) {
      const user = await User.findOne({ username: author });
      if (user) {
        filter.author = user._id;
      }
    }
    const articles = await Article.find(filter)
      .populate("author")
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      articles,
    });
  } catch (error) {
    next(error);
  }
};
