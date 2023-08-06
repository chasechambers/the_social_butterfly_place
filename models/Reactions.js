const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');


// Schema to create User model
const reactionsSchema = new Schema(
  {
    reactionBOdy: {
    type: String,
    required: true,
    max: 280,
    }
  },
  {
    reactionId: {
        type: Schema.Types.ObjectId,
    }
  },
{
  username: {
  type:String, 
  required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);

// Initialize our User model
const Reactions = model('reactions', reactionsSchema);

module.exports = Reactions;
