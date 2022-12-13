const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

// 用户页面相关
router.use(require("./user"));

module.exports = router;
