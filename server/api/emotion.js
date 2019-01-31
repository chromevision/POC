const router = require('express').Router();
const { Emotion } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allEmotions = await Emotion.findAll();
    res.send(allEmotions);
  } catch (error) {
    next(error);
  }
});
