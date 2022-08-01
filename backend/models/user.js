// models/user.js

const mongoose = require('mongoose');
const emailValidator = require('validator');

const { linkRegex } = require('../utils/regex');
// Describe the schema:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailValidator.isEmail(v);
      },
      message: 'Sorry. This is not an email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: [true, 'a name is required'],
    minlength: [2, 'the minimum length of a name should be 2 characters'],
    maxlength: [30, 'the maximum length of a name should be 30 characters'],
  },
  about: {
    type: String,
    required: [true, 'an about is required'],
    minlength: [2, 'the minimum length of about should be 2 characters'],
    maxlength: [30, 'the maximum length of about should be 30 characters'],
  },
  avatar: {
    type: String,
    required: [true, ' a url to an avatar is required'],
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: 'Sorry. This is not a correct url',
    },
  },
});

// create the model and export it
module.exports = mongoose.model('user', userSchema);
