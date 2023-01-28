const { MongoClient } = require("mongodb");

// mongodb:27017中的mongodb代表的容器的名称
// 当在同一个网络中时，可以直接通过容器的名称来访问服务，防止通过容器ip访问时ip变化问题
const MongoClientUrl =
  process.env.MONGO_CLIENT_URL || "mongodb://mongodb:27017";

let client,
  db,
  obj = {};

async function main() {
  client = new MongoClient(MongoClientUrl);
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db("node-docker");
}

main();

Object.defineProperties(obj, {
  client: {
    get() {
      return client;
    },
  },
  db: {
    get() {
      return db;
    },
  },
});

module.exports = obj;
