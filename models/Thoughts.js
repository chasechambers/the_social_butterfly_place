const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
      get: createdAtVal => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Schema to create Thoughts model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
      index,
    },
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
