
const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const Groups = sequelize.define('groups', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
});

module.exports = Groups;