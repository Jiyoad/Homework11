const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_tracker_DB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  } else {
  console.log("connected as id " + connection.threadId);
  };
});

connection.query = util.promisify(connection.query);

module.exports = connection;