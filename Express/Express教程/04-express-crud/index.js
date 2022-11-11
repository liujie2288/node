const express = require("express");

const model = require("./model");

const app = express();
const port = 3010;

// 解析请求体中间件，设置后可以在`req.body`获取到请求参数
app.use(express.json());
app.use(express.urlencoded());

// 查询todo列表
app.get("/todos", async function (req, res) {
  try {
    const todos = await model.getTodos();
    res.status(200).json({ data: todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 根据ID查询单个todo
app.get("/todos/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const todo = await model.getTodoById(id);
    if (todo) {
      res.status(200).json({ data: todo });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加todo
app.post("/todos", async function (req, res) {
  const { todo } = req.body;
  try {
    if (!todo) {
      return res.status(422).json({ error: "缺少todo参数" });
    }
    const addTodoItem = await model.addTodo(todo);
    res.status(201).json({ data: addTodoItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 修改todo
app.patch("/todos/:id", async function (req, res) {
  const { id } = req.params;
  const { todo: newTodo } = req.body;
  try {
    const todo = await model.getTodoById(id);
    if (todo) {
      const result = await model.updateTodo(id, newTodo);
      res.status(200).json({ data: result });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/todos/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const todo = await model.getTodoById(id);
    if (todo) {
      await model.deleteTodo(id);
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
