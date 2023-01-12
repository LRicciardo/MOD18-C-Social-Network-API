const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // use a getter method to format the timestamp
    },
    // A thought can only have 1 creator(username)
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      // A thought can have multiple reactions
    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
