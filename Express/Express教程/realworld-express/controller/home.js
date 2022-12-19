const { Article } = require("../model");
// 显示首页
exports.showIndex = async function (req, res, next) {
  try {
    const { pn = 1, size = 2 } = req.query;
    const [feedsCount, feeds] = await Promise.all([
      Article.find({}).countDocuments(),
      Article.find({})
        .populate("author")
        .skip((pn - 1) * size)
        .limit(size)
        .sort({ createdAt: -1 }), // 按降序排序（-1降序，1升序），最新的文章在最前面
    ]);
    res.render("index", {
      feeds: feeds || [],
      total: feedsCount,
      pages: Math.ceil(feedsCount / size),
      pn,
      size,
    });
  } catch (error) {
    next(error);
  }
};

exports.showYourFeedIndex = function (req, res, next) {
  try {
    res.render("index", {
      feeds: [],
    });
  } catch (error) {
    next(error);
  }
};
