const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { findByIdErrorHandler, createOrUpdateErrorHandler, findAllDocumentsErrorHandler } = require('../utils/errorHandlers');

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail() // throws a DocumentNotFoundError
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      findByIdErrorHandler(err, res);
    });
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      createOrUpdateErrorHandler(err, res);
    });
};

// the login request handler
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
       // we're creating a token
       const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

       // we return the token
       res.send({ token });
    })
    .catch((err) => {
            // authentication error
      res
        .status(401)
        .send({ message: err.message });
    });
  
}; 

// the getAllUsers request handler
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .orFail() // throws a DocumentNotFoundError
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      findAllDocumentsErrorHandler(err, res);
    });
};

// the updateUser request handler
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will not be created
    },
  )
    .orFail() // throws a DocumentNotFoundError
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      createOrUpdateErrorHandler(err, res);
    });
};

// the updateAvatar request handler
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will not be created
    },
  )
    .orFail() // throws a DocumentNotFoundError
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      createOrUpdateErrorHandler(err, res);
    });
};
