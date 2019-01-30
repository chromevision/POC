const Sequelize = require('sequelize');
const db = require('../db');

const Emotion = db.define('emotion', {
  url: {
    type: Sequelize.STRING,
  },
  angerScore: {
    type: Sequelize.STRING,
  },
  contemptScore: {
    type: Sequelize.STRING,
  },
  disgustScore: {
    type: Sequelize.STRING,
  },
  fearScore: {
    type: Sequelize.STRING,
  },
  happinessScore: {
    type: Sequelize.STRING,
  },
  neutralScore: {
    type: Sequelize.STRING,
  },
  sadnessScore: {
    type: Sequelize.STRING,
  },
  surpriseScore: {
    type: Sequelize.STRING,
  },
});

module.exports = Emotion;
