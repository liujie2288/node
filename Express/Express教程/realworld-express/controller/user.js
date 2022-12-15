exports.showLogin = async function (req, res, next) {
  try {
    res.render("login", { isLogin: true });
  } catch (err) {
    next(err);
  }
};

exports.showRegister = async function (req, res, next) {
  try {
    res.render("login");
  } catch (err) {
    next(err);
  }
};

exports.register = async function () {};
