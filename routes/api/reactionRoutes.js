const router = require('express').Router();

const {
  createReaction,
  getReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

router.route('/').get(getReaction).post(createReaction);

router.route('/:id').delete(deleteReaction);

module.exports = router;
