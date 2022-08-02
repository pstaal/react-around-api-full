const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

// the getUser request handler
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('No documents were found!')) 
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// the getUser request handler
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('No documents were found!')) 
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// the createUser request handler
module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') return next(new NotFoundError('Could not find the document'));
      if (err.name === 'ValidatorError') return next(new BadRequestError(err.message));
      return next(err);
    });
};

// the login request handler
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
       // we're creating a token
       const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

       // we return the token
       res.send({ token });
    })
    .catch(next);
}; 

// the getAllUsers request handler
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('No documents were found!')) 
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// the updateUser request handler
module.exports.updateUser = (req, res, next) => {
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
    .orFail(new NotFoundError('No documents were found!')) 
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// the updateAvatar request handler
module.exports.updateAvatar = (req, res, next) => {
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
    .orFail(new NotFoundError('No documents were found!')) 
    .then((user) => res.send({ data: user }))
    .catch(next);
};
