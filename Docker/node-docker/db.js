const { MongoClient } = require("mongodb");

let client,
  db,
  obj = {};

async function main() {
  client = new MongoClient("mongodb://mongo:7733");
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
