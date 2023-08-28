const Sequelize = require("sequelize");
const properties = require("properties-parser");
const config = properties.read("./app.properties");
//production ? use DB-PROD properties for dbConfig : use DB-DEV
const production = config.production === "true";

const dbConfig = {
  host: "localhost",
  user: production ? config.userPRODDB : config.userDEVDB,
  password: production ? config.passwordPRODDB : config.passwordDEVDB,
  database: production ? config.PRODDB : config.DEVDB,
};

console.log(dbConfig);

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
