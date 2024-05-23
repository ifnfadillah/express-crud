// Get the client
const mysql = require("mysql2");
// Create the connection to database
const createDatabaseConnection = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "express_intro",
  });

  connection.connect((err) => {
    if (err) {
      console.error("error connecting: ", err);
      return;
    }
    console.log("connected to database with id" + connection.threadId);
  });
  return connection;
};

module.exports = createDatabaseConnection;
