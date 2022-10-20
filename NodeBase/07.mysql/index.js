var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "mysql",
});

connection.connect((err) => {
  if (err) {
    console.log("Error en db: ", err);
    return;
  } else {
    console.log("Db ok");
  }
});

connection.query("SELECT * FROM user", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
