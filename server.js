const express = require('express');
const server = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Import routes
const postsRoute = require('./routes/posts');
server.use('/posts', postsRoute);

//Middlewares
// server.use('/posts', () => {
//   console.log('This is middleware running.');
// });

//ROUTES
server.get('/', (req, res) => {
  res.send('We are on home');
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },

  () => {
    console.log('Connected to DB');
  }
);

//How to we start listening to the server
server.listen(3000);
