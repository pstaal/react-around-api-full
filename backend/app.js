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

const auth = require('./middleware/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser); 

// authorization
app.use(auth);

app.use('/cards', cards);
app.use('/users', users);

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({ message: 'Requested resource not found' }, 404);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
