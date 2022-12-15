const express = require("express");
const userCtrl = require("../controller/user");
const validator = require("../validator/user");
const auth = require("../middleware/auth");

const router = express.Router();

// 登陆页面
router.get("/login", userCtrl.showLogin);

// 注册页面
router.get("/register", userCtrl.showRegister);

// 注册页面逻辑处理
router.post("/register", validator.register, userCtrl.register);

// 设置页面
router.get("/settings", function (req, res) {
  res.render("settings");
});

router.get("/profile/:username", function (req, res) {
  res.render("profile");
});

// router.get("/profile/:username/favorites", function () {
//   res.send("这里渲染个人收藏页面");
// });

//  用户注册
// router.post("/register", validator.register, userCtrl.register);
// router.post("/register", validator.registerRules, async (req, res) => {
//   const errors = validationResult(req);
//   console.log(errors.array());
//   // throw new Error("123");
//   res.render("login", { errors: errors.array() });
// });

// // 用户登录
// router.post("/users/login", validator.login, userCtrl.login);

// // 获取当前的登录用户
// router.get("/user", auth(), userCtrl.getCurrentUser);

// // 更新用户
// router.put("/user", auth(), userCtrl.updateCurrentUser);

module.exports = router;
