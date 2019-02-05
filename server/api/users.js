const router = require('express').Router();
const { User, Emotion } = require('../db/models');

router.get('/', async (req, res, next) => {
	try {
		if (!req.user || !req.user.admin) {
			res.send("You're not authorized!");
		} else {
			const userList = await User.findAll();
			res.send(userList);
		}
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		if (!req.user || !req.user.admin) {
			res.send("You're not authorized!");
		} else {
			const thisUser = await User.findById(req.params.id);
			res.send(thisUser);
		}
	} catch (error) {
		next(error);
	}
});

router.get('/:id/emotions', async (req, res, next) => {
	try {
		if (!req.user || Number(req.params.id) !== req.user.id) {
			res.send("You're not authorized!");
		} else {
			const userEmotions = await Emotion.findAll({
				where: {
					userId: req.params.id
				},
				include: [{ all: true }]
			});
			res.send(userEmotions);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
