const http = require("http");

class Appliation {
  constructor() {
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn);
  }
  listen(...arg) {
    http
      .createServer((req, res) => {
        res.end("Hello Jay");
      })
      .listen(...arg);
  }
}

module.exports = Appliation;
