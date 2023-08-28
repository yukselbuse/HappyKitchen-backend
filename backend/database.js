const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("happy_kitchen", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
