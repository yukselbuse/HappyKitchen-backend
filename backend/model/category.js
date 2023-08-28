const Sequelize = require("sequelize");
const sequelize = require("../database");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Category;
