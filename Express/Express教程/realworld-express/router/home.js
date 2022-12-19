const express = require("express");
const homeCtrl = require("../controller/home");
const auth = require("../middleware/auth");

const router = express.Router();

// 显示首页
router.get("/", homeCtrl.showIndex);

// 显示首页（你的订阅）
router.get("/yourFeed", auth(), homeCtrl.showYourFeedIndex);

module.exports = router;
