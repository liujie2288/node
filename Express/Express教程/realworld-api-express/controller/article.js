exports.createArticle = async function (req, res, next) {
  try {
    res.status(200).json({
      article: null,
    });
  } catch (error) {
    next(error);
  }
};
