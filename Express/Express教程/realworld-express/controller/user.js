const { User } = require("../model");
const { sessionSave, sessionRegenerate } = require("../util/session");

exports.showLogin = async function (req, res, next) {
  try {
    res.render("login", { isLogin: true });
  } catch (err) {
    next(err);
  }
};

exports.login = function (req, res, next) {
  try {
    // 保存用户数据到session中
    req.session.user = req.user;
    // 返回用户信息
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
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
    // 3. session保存登录用户信息
    // 保存之前先重新生成session id
    await sessionRegenerate(req);
    // 保存用户信息
    req.session.user = userModel;
    // 将新的session id设置到请求头中发送给客户端
    // await sessionSave(req);
    // 4. 注册成功，返回用户信息
    res.status(201).send({ user: userModel });
  } catch (err) {
    next(err);
  }
};

exports.showSettings = async function (req, res, next) {
  try {
    res.render("settings");
  } catch (err) {
    next(err);
  }
};

exports.showProfile = async function (req, res, next) {
  try {
    res.render("profile");
  } catch (err) {
    next(err);
  }
};

exports.logout = function (req, res, next) {
  try {
    // 清除session 用户信息
    req.session.user = null;
    // 跳转到首页
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
