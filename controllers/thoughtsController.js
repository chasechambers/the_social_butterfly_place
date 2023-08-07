const { Thoughts, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought({ params, body }, res) {
    try {
      const thought = await Thoughts.findOne({
        _id: params.id,
      }).select('-__v');

      const user = await User.findOne({
        userId: params.username,
      }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      console.log(thought, user);
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought({ params, body }, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        {
          _id: params.id,
        },
        body,
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({
        _id: params.id,
      }).select('-__v');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new thought
  async createThought({ params, body }, res) {
    try {
      const user = await User.findOne({
        userId: params.id,
      });
      const thought = await Thoughts.create(body);
      console.log(thought, user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
