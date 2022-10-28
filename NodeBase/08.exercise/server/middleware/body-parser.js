module.exports = async function (req, res) {
  return new Promise((resolve, reject) => {
    const contentType = req.headers["content-type"];
    let buffer = Buffer.from([]);
    req.on("data", function (chunk) {
      buffer = Buffer.concat([buffer, chunk]);
    });
    req.on("end", function () {
      let data = buffer.toString();
      try {
        if (contentType?.includes("application/x-www-form-urlencoded")) {
          const searchParams = new URLSearchParams(data);
          data = Object.fromEntries(searchParams.entries());
        } else if (contentType?.includes("application/json")) {
          data = JSON.parse(data);
        }
      } catch (error) {
        console.log(error);
      }
      console.log("body-parser", data);
      req.body = data;
      resolve(data);
    });
    req.on("error", function (err) {
      reject(err);
    });
  });
};
