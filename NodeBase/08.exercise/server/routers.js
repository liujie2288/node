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
  {
    method: "GET",
    path: "/messages",
    fn: controller.message.getMessage,
  },
  {
    method: "POST",
    path: "/sendMessage",
    fn: controller.message.sendMessage,
  },
];
