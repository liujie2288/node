const fs = require("fs/promises");
const path = require("path");

async function getTodos() {
  const result = await fs.readFile(
    path.join(__dirname, "./data.json"),
    "utf-8"
  );
  return JSON.parse(result);
}

async function writeTodos(data) {
  await fs.writeFile(
    path.join(__dirname, "./data.json"),
    JSON.stringify(data, null, 2)
  );
}

async function getTodoById(id) {
  const todos = await getTodos();
  return todos.find((todo) => todo.id == id);
}

async function addTodo(todo) {
  const todos = await getTodos();
  todos.sort((a, b) => a.id - b.id);
  const addTodoItem = {
    id: todos[todos.length - 1].id + 1,
    todo,
  };
  todos.push(addTodoItem);
  await writeTodos(todos);
  return addTodoItem;
}

async function updateTodo(id, newTodo) {
  const todos = await getTodos();
  const index = todos.findIndex((todo) => todo.id == id);
  const newTodoItem = Object.assign(todos[index], { todo: newTodo });
  todos.splice(index, 1, newTodoItem);
  await writeTodos(todos);
  return newTodoItem;
}

async function deleteTodo(id) {
  const todos = await getTodos();
  const newTodos = todos.filter((todo) => todo.id != id);
  await writeTodos(newTodos);
}

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
