const router = require('express').Router();

const {
  getThoughts,
  deleteThought,
  createThought,
  getSingleThought,
  updateThought,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/users/:thought:id
router
  .route('/:id')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

module.exports = router;
