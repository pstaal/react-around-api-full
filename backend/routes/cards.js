const cards = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/validateURL');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');




cards.get('/', getCards);

cards.post('/', celebrate({
  body: Joi.object().keys({
  name: Joi.string().required(),
  link: Joi.string().required().custom(validateURL),
}), 
}), createCard);

cards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
  cardId: Joi.string().alphanum().required(),
}).unknown(true), 
}), deleteCard);

cards.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
  cardId: Joi.string().alphanum().required(),
}).unknown(true), 
}), likeCard);

cards.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
  cardId: Joi.string().alphanum().required(),
}).unknown(true), 
}), dislikeCard);

module.exports = cards;
