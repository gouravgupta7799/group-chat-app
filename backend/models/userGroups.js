

const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const userGroups = sequelize.define('userGroups', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupName: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = userGroups;