const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => {
        const date = new Date(createdAtVal);
        return date.toLocaleString('en-US');
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('reaction', ReactionSchema);

module.exports = Reaction;
