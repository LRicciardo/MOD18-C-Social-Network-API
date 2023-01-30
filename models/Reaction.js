const { Schema, Types } = require('mongoose');
const { DateTime }  = require("luxon");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      default: 'Unnamed reaction',
      trim: true,
    },
    username: {
      type: String,
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp
      // YMD with 24 hour clock format
      get: (timestamp) => DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_MED),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
