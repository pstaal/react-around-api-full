const User = require('../models/user');
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      createOrUpdateErrorHandler(err, res);
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
