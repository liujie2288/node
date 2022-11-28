const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const validate = require("../middleware/validate");
const { User } = require("../model");

exports.register = validate([
  body("user.username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .isString()
    .withMessage("用户名必须是字符串")
    .bail() // 如果前面验证失败，则停止运行验证
    // 自定义校验逻辑
    .custom(async (username) => {
      // 判断添加的邮箱是否重复
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("用户名已存在");
      }
    }),
  body("user.password").notEmpty().withMessage("密码不能为空"),
  body("user.email")
    .notEmpty() // 不能为空
    .withMessage("邮箱不能为空") // 自定义消息内容
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail() // 如果前面验证失败，则停止运行验证
    // 自定义校验逻辑
    .custom(async (email) => {
      // 判断添加的邮箱是否重复
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
]);

exports.login = [
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  //上面非空验证通过后，再确认用户名是否存在
  validate([
    body("user.email").custom(async (email, { req }) => {
      // 因为model中select:false,所以这里需要通过populate把密码填充回来
      const user = await User.findOne({ email }).populate("password");
      if (!user) {
        return Promise.reject("邮箱不存在");
      }
      // 存在则挂载用户信息方便接下来的中间件使用
      req.user = user;
    }),
  ]),
  // 用户名存在后，验证该用户的密码和传递的密码是否一致
  validate([
    body("user.password").custom(async (password, { req }) => {
      if (!bcrypt.compareSync(password, req.user.password)) {
        return Promise.reject("密码不正确");
      }
    }),
  ]),
];
