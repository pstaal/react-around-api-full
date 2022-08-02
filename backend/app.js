const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config(); 
// listen to port 3000
const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '62bb093728d805edeb12d07d', // paste the _id of the test user created in the previous step
  };

  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({ message: 'Requested resource not found' }, 404);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
