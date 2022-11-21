const express = require("express");
const userCtrl = require("../controller/user");
const validator = require("../validator/user");

const router = express.Router();

// 用户登录
router.post("/users/login", userCtrl.login);

// 用户注册
router.post("/users", validator.register, userCtrl.register);

// 获取当前的登录用户
router.get("/user", userCtrl.getCurrentUser);

// 更新用户
router.put("/user", userCtrl.updateCurrentUser);

module.exports = router;
