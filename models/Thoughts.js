const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require('./Reaction');
// Schema to create Thoughts model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
