const router = require('express').Router();
const { User, Emotion } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const userList = await User.findAll();
    res.send(userList);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const thisUser = await User.findById(req.params.id);
    res.send(thisUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/emotions', async (req, res, next) => {
  try {
    const userEmotions = await Emotion.findAll({
      where: {
        userId: req.params.id,
      },
      include: [{ all: true }],
    });
    res.send(userEmotions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
