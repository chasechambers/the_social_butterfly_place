const { Schema, model } = require('mongoose');
const Reactions = require('./Reactions');


// Schema to create User model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
    }
  },
{
  createdAt: {
  type:Date, 
  default: Date.now,
  },
  username: {
    type: String,
    require: true,
  },
  reactions: [Reactions]
},
);

// Initialize our User model
const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
