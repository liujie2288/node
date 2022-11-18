// 用户登录
exports.login = async function (req, res, next) {
  try {
    // JSON.parse("是短发是短发时");
    // 登录逻辑处理
    res.send("post /users/login");
  } catch (error) {
    next(error);
  }
};

// 用户注册
exports.register = async function (req, res, next) {
  try {
    console.log(req.body);
    // 注册逻辑处理
    res.send("post /users");
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息
exports.getCurrentUser = async function (req, res, next) {
  try {
    // 获取当前的登录用户逻辑处理
    res.send("get /user");
  } catch (error) {
    next(error);
  }
};

// 更新当前用户信息
exports.updateCurrentUser = async function (req, res, next) {
  try {
    // 更新用户逻辑处理
    res.send("put /user");
  } catch (error) {
    next(error);
  }
};
