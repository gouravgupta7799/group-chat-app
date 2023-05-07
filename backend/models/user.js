const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const User = sequelize.define('users', {

  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userContect: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userEmail: {
    type: Sequelize.STRING,
    Unique: true,
    allowNull: false
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = User;