const router = require('express').Router();
const {
  getThoughts,
  createThoughts,
  createThought,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts);
// .post(createThoughts);

// // /api/users/:thought:id
// router.route('/thought/:id').delete(createThought);

module.exports = router;
