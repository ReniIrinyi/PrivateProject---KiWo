const Sequelize = require("sequelize");

const dbConfig = {
  host: "localhost",
  user: "kiwo",
  password: "kiwo",
  database: "kiwo_submissions",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    logging: false, // Disable logging SQL queries
  }
);

module.exports = sequelize;
