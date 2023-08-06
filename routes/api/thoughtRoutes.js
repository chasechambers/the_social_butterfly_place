const router = require('express').Router();
const {
  getThoughts,
  deleteThought,
  createThought,
  getSingleThought,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts);
// .post(createThoughts);

// /api/users/:thought:id
router.route('/:id').get(getSingleThought).delete(deleteThought);
// .get(getSingleThought);
// .delete(createThought);

module.exports = router;
