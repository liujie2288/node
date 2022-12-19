const express = require("express");

const router = express.Router();

// 首页
router.use(require("./home"));

// 用户页面相关
router.use(require("./user"));

// 文章页面相关
router.use(require("./article"));

module.exports = router;
