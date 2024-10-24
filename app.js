require('express-async-errors');
const express = require('express');
const errorHandler = require('./handlers/errorHandler');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Connect to the Database
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err);
  });
// Middleware

app.use(express.json());

// At the end of all routes...
app.use(errorHandler);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
