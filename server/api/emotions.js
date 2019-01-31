const router = require('express').Router();
const { Emotion } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const allEmotions = await Emotion.findAll();
    res.send(allEmotions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
