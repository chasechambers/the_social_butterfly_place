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
      console.log(dbReactionData);

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
      const dbThoughtData = await Thoughts.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: dbReactionData._id } },
        { new: true }
      );

      const dbReactionData = await Reaction.findOneAndDelete({
        _id: params.id,
      }).select('-__v');

      console.log(dbThoughtData);

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }
      res.json(reaction);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
