const { secret } = require("../config/config.default");
const { User } = require("../model");
const { verify } = require("../util/jwt");
module.exports = () =>
  async function (req, res, next) {
    const Authorization = req.get("Authorization");
    const token = Authorization ? Authorization.split(" ")[1] : "";
    if (!token) {
      return res.status(401).end();
    }
    try {
      const decoded = await verify(token, secret);
      // 为当前请求挂载用户信息，后续中间件可以直接使用
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  };
