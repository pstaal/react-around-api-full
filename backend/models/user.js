// models/user.js

const mongoose = require('mongoose');
const validator = require('validator');

const { linkRegex } = require('../utils/regex');
// Describe the schema:
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
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
    default: "Jacques Cousteau",
    minlength: [2, 'the minimum length of a name should be 2 characters'],
    maxlength: [30, 'the maximum length of a name should be 30 characters'],
  },
  about: {
    type: String,
    default: "Explorer",
    minlength: [2, 'the minimum length of about should be 2 characters'],
    maxlength: [30, 'the maximum length of about should be 30 characters'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
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
