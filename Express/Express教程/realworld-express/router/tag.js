const express = require("express");

const router = express.Router();

// 获取所有标签
router.get("/", async function (req, res, next) {
  try {
    res.send("post /tags");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
