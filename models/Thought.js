const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// const dateformat = require('dateformat');
const { DateTime }  = require("luxon");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "No blanking out! Leave a thought.",
      minlength: 1,
      maxlength: 500,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // use a getter method to format the timestamp
      // YMD with 24 hour clock format
      // get: (timestamp) => dateformat(timestamp, 'yyyy-mm-dd HH:MM:SS' ),
      get: (timestamp) => DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_MED),
    },
    // A thought can only have 1 creator(username)
    username: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      required: true,
      },
      // A thought can have multiple reactions
    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// creates a field for the number of reactions that a thought has accumulated
thoughtSchema.virtual("reactionCount")
.get(function () { return this.reactions.length});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
