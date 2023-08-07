const { Reaction, Thoughts } = require('../models');

module.exports = {
  async getReaction(req, res) {
    try {
      const reactions = await Reaction.find();
      console.log(reactions);
      res.json(reactions);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const dbReactionData = await Reaction.create(req.body);

      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: dbReactionData._id } },
        { new: true }
      );

      if (!dbThoughtData) {
        return res
          .status(404)
          .json({ message: 'Reaction created but no thought with this id!' });
      }

      res.json({ message: 'Reaction successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteReaction({ params }, res) {
    try {
      const reactions = await Reaction.findOneAndDelete({
        reactionId: params.id,
      }).select('-__v');
      if (!reactions) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }

      res.json(reactions);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
