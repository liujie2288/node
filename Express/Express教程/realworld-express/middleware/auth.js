module.exports = () => (req, res, next) => {
  // 检查有没有sessionUser
  if (req.session.user) {
    return next();
  }
  // 没有登录跳转到登录页
  res.redirect("/login");
};
