const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config(); 
// listen to port 3000
const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');

const { requestLogger, errorLogger } = require('./middleware/logger'); 

const {
  login,
  createUser
} = require('./controllers/users');

const { celebrate, Joi, errors } = require('celebrate');

const { NotFoundError } = require('./errors/not-found-error');

const cors = require('cors');

const auth = require('./middleware/auth');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

// include these before other routes
app.use(cors());
app.options('*', cors()); //enable requests for all routes 

app.use(express.json());
app.use(helmet());

app.use(requestLogger); // enabling the request logger

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

app.get('*', (req, res, next) => {
  next(new NotFoundError('This page does not exist'));
});

app.use(errorLogger); // enabling the error logger

//errors from celebrate
app.use(errors());

//error middleware
app.use(errorMiddleware); 

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
