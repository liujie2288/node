const controller = require("./controller");
module.exports = [
  {
    method: "POST",
    path: "/login",
    fn: controller.login.login,
  },
  {
    method: "POST",
    path: "/register",
    fn: controller.register.register,
  },
];
