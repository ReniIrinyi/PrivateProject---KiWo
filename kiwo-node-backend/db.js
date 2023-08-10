const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "kiwo",
  password: "kiwo",
  database: "kiwo_submissions",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
