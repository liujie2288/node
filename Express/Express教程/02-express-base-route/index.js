const express = require("express");
const app = express();
const port = 3010;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("post /");
});

app.put("/user", (req, res) => {
  res.send("put user");
});

app.delete("/user", (req, res) => {
  res.send("delete user");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
