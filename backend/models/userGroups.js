

const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const userGroups = sequelize.define('userGroups', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }

});

module.exports = userGroups;