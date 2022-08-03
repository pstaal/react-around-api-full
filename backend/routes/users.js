const users = require('express').Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

const { celebrate, Joi } = require('celebrate');

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
  avatar: Joi.string().required(),
}), 
}), updateAvatar);

module.exports = users;
