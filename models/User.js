const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
    }
  },
{
  email: {
  type: String,
  required: true,
  unique: true,
  },
},
{
  thoughts: [Thoughts]
},
{
  friends: []
}
);

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
