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

router.get('/:id', async (req, res, next) => {
  try {
    const allEmotionsForUser = await Emotion.findAll({
      where: {
        userTokenId: req.params.id,
      },
      include: [{ all: true }],
    });
    res.send(allEmotionsForUser);
  } catch (error) {
    next(error);
  }
});
