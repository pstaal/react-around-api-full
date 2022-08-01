// models/card.js

const mongoose = require('mongoose');

const { linkRegex } = require('../utils/regex');

// Describe the schema:
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'the minimum length of a name should be 2 characters'],
    maxlength: [30, 'the maximum length of a name should be 30 characters'],
  },
  link: {
    type: String,
    required: [true, ' a link is required'],
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: 'Sorry. This is not a correct url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'an owner is required'],
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// create the model and export it
module.exports = mongoose.model('card', cardSchema);
