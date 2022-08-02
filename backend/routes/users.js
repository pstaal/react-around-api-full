const users = require('express').Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar
} = require('../controllers/users');

users.get('/', getAllUsers);

users.get('/:userId', getUser);

users.patch('/me', updateUser);

users.patch('/me/avatar', updateAvatar);

module.exports = users;
