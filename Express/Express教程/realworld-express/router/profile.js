const express = require("express");

const router = express.Router();

// 根据用户名获取用户资料
router.get("/:username", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("get /profiles/:username");
  } catch (error) {
    next(error);
  }
});

// 关注用户
router.post("/:username/follow", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("get /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
});

// 取消关注
router.delete("/:username", async function (req, res, next) {
  try {
    // 逻辑处理
    res.send("delete /profiles/:username/follow");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
