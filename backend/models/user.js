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


userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // now user is available
        });
    });
};

// create the model and export it
module.exports = mongoose.model('user', userSchema);
