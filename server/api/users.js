const router = require('express').Router();
const { User } = require('../models');

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

module.exports = router;
