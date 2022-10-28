module.exports = {
  cors: require("./cors"),
  bodyParser: require("./body-parser"),
  // ...其它中间件
  applyMiddlewares: (req, res) => async (middlewares) => {
    for (let index = 0; index < middlewares.length; index++) {
      try {
        await middlewares[index](req, res);
      } catch (error) {
        console.log("middleware error", error);
        return false;
      }
    }
    return true;
  },
};
