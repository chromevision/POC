const router = require('express').Router();
const { User, Emotion } = require('../models');

// we can and should place authentication middleware here, but we currently
// have no way of accessing the userTokenId, which is currently being passed
// in req.headers by the chrome extension. I wonder if Redux can solve this
// issue for us... - Joseph

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
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/emotions', async (req, res, next) => {
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
