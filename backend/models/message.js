
const Sequelize = require('sequelize');
const sequelize = require('../utills/database');

const Message = sequelize.define('messages', {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chats: {
    type: Sequelize.STRING,
  }
});

module.exports = Message;
