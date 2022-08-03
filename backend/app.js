const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config(); 
// listen to port 3000
const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');

const {
  login,
  createUser
} = require('./controllers/users');

const { celebrate, Joi, errors } = require('celebrate');


const auth = require('./middleware/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());
app.use(helmet());

app.post('/signin', celebrate({
  body: Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
}), 
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
}), 
}), createUser); 

// authorization
app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({ message: 'Requested resource not found' }, 404);
});


//errors from celebrate
app.use(errors());

//error middleware
app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // check the status and display a message based on it
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
}); 

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
