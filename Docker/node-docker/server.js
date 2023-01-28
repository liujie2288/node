const express = require("express");
const db = require("./db");

const app = express();
const port = process.env.SERVER_PORT || 7710;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.end("hello world!");
});

app.post("/add", async function (req, res) {
  const collection = db.db.collection("notes");
  const data = await collection.insertOne(req.body);
  res.send(data);
});

app.get("/list", async function (req, res) {
  const collection = db.db.collection("notes");
  const doc = await collection.find().toArray();
  res.send(doc);
});

app.listen(port, function () {
  console.log(`server at http://localhost:${port}`);
});
