const Card = require('../models/card');
const { findByIdErrorHandler, createOrUpdateErrorHandler, findAllDocumentsErrorHandler } = require('../utils/errorHandlers');

// the getCards request handler
module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail() // throws a DocumentNotFoundError
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      findAllDocumentsErrorHandler(err, res);
    });
};

// the createCard request handler
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      createOrUpdateErrorHandler(err, res);
    });
};

// the deleteCard request handler
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail() // throws a DocumentNotFoundError
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      findByIdErrorHandler(err, res);
    });
};

// the likeCard request handler
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail() // throws a DocumentNotFoundError
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      findByIdErrorHandler(err, res);
    });
};

// the dislikeCard request handler
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail() // throws a DocumentNotFoundError
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      findByIdErrorHandler(err, res);
    });
};
