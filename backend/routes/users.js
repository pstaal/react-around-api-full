const users = require('express').Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

users.get('/', getAllUsers);

users.get('/:userId', getUser);

users.get('/me', getCurrentUser);

users.patch('/me', updateUser);

users.patch('/me/avatar', updateAvatar);

module.exports = users;
