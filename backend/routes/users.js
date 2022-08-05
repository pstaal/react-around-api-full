const users = require('express').Router();
const validateURL = require('../utils/validateURL');
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');



users.get('/', getAllUsers);

users.get('/:userId', 
  celebrate({
    params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }), 
  }), getUser);

users.get('/me', getCurrentUser);

users.patch('/me', celebrate({
  body: Joi.object().keys({
  name: Joi.string().required(),
  about: Joi.string().required(),
}), 
}), updateUser);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
  avatar: Joi.string().required().custom(validateURL),
}), 
}), updateAvatar);

module.exports = users;
