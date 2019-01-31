const router = require('express').Router();
const { Emotion } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const allEmotions = await Emotion.findAll();
    res.send(allEmotions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userEmotions = await Emotion.findAll({
      where: {
        userTokenId: req.params.id,
      },
      include: [{ all: true }],
    });
    res.send(userEmotions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
