const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate email 
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 
        'Invalid email address. Please correct.'],
    },
    // one user can have multiple thoughts
    // thoughts is an array of object identifiers pointing to the thought documents 
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    // one user can have multiple friends
    // friends is an array of object identifiers pointing to the user documents 
    //    friends needs to self-reference to users in the user model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      validators: true,
    },
    id: false,
  }
);

// creates a field for the number of friends that a user has
userSchema.virtual("friendCount")
.get(function () { return this.friends.length});

// creates a field for the number of thoughts that a user has created
userSchema.virtual("thoughtCount")
.get(function () { return this.thoughts.length});

const User = model('user', userSchema);

module.exports = User;
