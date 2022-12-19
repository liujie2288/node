const { Article, User } = require("../model");

// 显示首页
exports.showIndex = function (req, res, next) {
  try {
    res.render("editor");
  } catch (error) {
    next(error);
  }
};

// 创建文章页面
exports.showCreateArticle = function (req, res, next) {
  try {
    res.render("editor");
  } catch (error) {
    next(error);
  }
};

// 创建单个文章页面
exports.showArticle = function (req, res, next) {
  try {
    res.render("article");
  } catch (error) {
    next(error);
  }
};

// 创建文章
exports.createArticle = async function (req, res, next) {
  try {
    const article = new Article(req.body.article);
    // 设置当前文章作者为当前用户
    article.author = req.session.user._id;
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
    const { author, limit = 20, offset = 0, tag } = req.query;
    // 筛选作者相关
    if (author) {
      const user = await User.findOne({ username: author });
      if (user) {
        filter.author = user._id;
      }
    }
    // 筛选分类相关
    if (tag) {
      filter.tagList = tag;
    }
    const [articlesCount, articles] = await Promise.all([
      Article.find(filter).countDocuments(),
      Article.find(filter)
        .populate("author")
        .skip(parseInt(offset)) // 跳过多少条
        .limit(parseInt(limit)) // 取多少条
        .sort({ createdAt: -1 }), // 按降序排序（-1降序，1升序），最新的文章在最前面
    ]);
    res.status(200).json({
      articles,
      articlesCount,
    });
  } catch (error) {
    next(error);
  }
};

async function articleExist(req, res, next) {
  try {
    // 1. 查看文章是否存在
    const { articleId } = req.params;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end();
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function articleOwn(req, res, next) {
  // 2. 查看文章是否是当前登录用户的
  if (req.article.author.toString() !== req.session.user._id.toString()) {
    return res.status(403).end();
  }
  next();
}

exports.updateArticle = [
  articleExist,
  articleOwn,
  async function (req, res, next) {
    try {
      // 3. 执行更新操作
      const {
        article: { title, body, description },
      } = req.body;
      if (title) {
        article.title = title;
      }
      if (body) {
        article.body = body;
      }
      if (description) {
        article.description = description;
      }
      // 保存到数据库
      article.save();
      // 4. 返回响应
      res.status(200).send({
        article,
      });
    } catch (error) {
      next(error);
    }
  },
];

// 删除文章
exports.deleteArticle = [
  articleExist,
  articleOwn,
  async function (req, res) {
    try {
      // 3. 执行删除操作
      await req.article.remove();
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },
];
