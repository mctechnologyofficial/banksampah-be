var Sequelize = require("sequelize");
var db = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorAlias: false,
    logging: false,
    pool: {
      max: 5,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  }
);

db.authenticate()
  .then(() => {
    console.log("Connection database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
