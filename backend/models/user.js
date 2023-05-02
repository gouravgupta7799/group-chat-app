const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const User = sequelize.define('users', {

  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING
  },
  userContect: {
    type: Sequelize.STRING
  },
  userEmail: {
    type: Sequelize.STRING
  },
  userPassword: {
    type: Sequelize.STRING
  }
});


module.exports = User;