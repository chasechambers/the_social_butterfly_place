const router = require('express').Router();
const { Types } = require('mongoose');

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

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: 'No thought found with this id!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: 'No thought found with this id!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
