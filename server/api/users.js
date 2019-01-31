const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const userList = await User.findAll();
    res.send(userList);
  } catch (error) {
    next(error);
  }
});
