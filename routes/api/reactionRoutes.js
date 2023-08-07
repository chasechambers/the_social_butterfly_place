const router = require('express').Router();
const { Reaction, Thoughts } = require('../../models');

const {
  createReaction,
  getReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

router.route('/').get(getReaction).post(createReaction);

// router.route('/:id').delete(deleteReaction);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the reaction by its ID
    const deletedReaction = await Reaction.findByIdAndDelete(id);

    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Remove the deleted reaction's ID from the Thoughts model
    const thoughtsWithReaction = await Thoughts.find({ reactions: id });
    await Promise.all(
      thoughtsWithReaction.map(thought => {
        thought.reactions.pull(id);
        return thought.save();
      })
    );

    return res.status(200).json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
