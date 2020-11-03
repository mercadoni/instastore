const dbConfig = require("../../config.js");
const Sequelize = require("sequelize");
/*const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});*/
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/instastore'); // Example for postgres


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groceryStore = require("./GroceryStore.js")(sequelize, Sequelize);

module.exports = db;
