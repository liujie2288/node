const { User } = require("../model");
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

exports.register = async function (req, res, next) {
  try {
    const { user = {} } = req.body;
    // 2. 验证通过，创建新用户
    // 执行数据保存到数据库操作
    let userModel = new User(user);
    // 数据保存到数据库中
    await userModel.save();
    // 过滤密码字段，不应该返回到客户端
    userModel = userModel.toJSON();
    delete userModel["password"];

    // 3. 注册成功，返回用户信息
    res.status(201).send({ user: userModel });
  } catch (err) {
    next(err);
  }
};
