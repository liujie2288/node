module.exports = async function (req, res) {
  return new Promise((resolve, reject) => {
    console.log(req.getHeader("Content-Type"));
    console.log(req.getHeaders());
    let buffer = Buffer.from([]);
    req.on("data", function (chunk) {
      buffer = Buffer.concat([buffer, chunk]);
    });
    req.on("end", function () {
      const data = buffer.toString();
      try {
        const newData = JSON.parse(data);
        req.body = newData;
      } catch (error) {
        req.body = data;
      }
      resolve(data);
    });
    req.on("error", function (err) {
      reject(err);
    });
  });
};
