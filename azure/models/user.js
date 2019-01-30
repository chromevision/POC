const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    // protect later
    type: Sequelize.STRING,
    allowNull: false,
  },
  tokenId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = User;
