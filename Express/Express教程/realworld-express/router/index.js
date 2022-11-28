const express = require("express");

const router = express.Router();

// 用户路由相关
router.use(require("./user"));

// 个人信息路由相关
router.use("/profiles", require("./profile"));

// 文章路由相关
router.use("/articles", require("./article"));

// 标签路由相关
router.use("/tags", require("./tag"));

module.exports = router;
