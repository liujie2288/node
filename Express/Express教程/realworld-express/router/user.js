const express = require("express");
const userCtrl = require("../controller/user");
const validator = require("../validator/user");
const auth = require("../middleware/auth");
const noAuth = require("../middleware/no-auth");

const router = express.Router();

// 登陆页面
router.get("/login", noAuth(), userCtrl.showLogin);

// 用户登录
router.post("/login", validator.login, userCtrl.login);

// 注册页面
router.get("/register", noAuth(), userCtrl.showRegister);

// 注册页面逻辑处理
router.post("/register", validator.register, userCtrl.register);

// 设置页面
router.get("/settings", auth(), userCtrl.showSettings);

// 个人简介页面
router.get("/profile/:username", userCtrl.showProfile);

// 用户退出
router.get("/logout", userCtrl.logout);

module.exports = router;
