const { secret } = require("../config/config.default");
const { User } = require("../model");
const { sign } = require("../util/jwt");
// 用户登录
exports.login = async function (req, res, next) {
  try {
    // 登录逻辑处理
    res.status(200).json({
      user: {
        email: req.user.email,
        username: req.user.username,
        bio: req.user.bio,
        image: req.user.image,
        token: await sign(
          {
            id: req.user._id,
          },
          secret
        ),
      },
    });
  } catch (error) {
    next(error);
  }
};

// 用户注册
exports.register = async function (req, res, next) {
  try {
    //1. 获取请求体数据
    console.log(req.body);
    //2. 数据验证（已经添加前置验证中间件，这里废弃）
    // const reqUser = req.body.user;
    // if (!reqUser.username) {
    //   return res.status(422).json({
    //     error: "缺少userName参数",
    //   });
    // }
    // if (!reqUser.email) {
    //   return res.status(422).json({
    //     error: "缺少email参数",
    //   });
    // }
    // if (!reqUser.password) {
    //   return res.status(422).json({
    //     error: "缺少password参数",
    //   });
    // }
    //3. 验证通过，将数据保存到数据库中
    let user = new User(req.body.user);
    // 数据保存到数据库中
    await user.save();
    // 过滤密码字段，不应该返回到客户端
    user = user.toJSON();
    delete user["password"];
    //4. 发送成功响应
    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息
exports.getCurrentUser = async function (req, res, next) {
  try {
    res.status(200).json({ user: req.user });
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
