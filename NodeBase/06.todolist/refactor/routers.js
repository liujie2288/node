const controller = require("./controller");
module.exports = [
  {
    method: "GET",
    path: "/todolist/list",
    fn: controller.todolist.list,
  },
  {
    method: "POST",
    path: "/todolist/add",
    fn: controller.todolist.add,
  },
  {
    method: "DELETE",
    path: "/todolist/remove/:id",
    fn: controller.todolist.remove,
  },
];
