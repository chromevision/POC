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
  },
  tokenId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;
