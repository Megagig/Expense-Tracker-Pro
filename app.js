require('express-async-errors');
const express = require('express');
const errorHandler = require('./handlers/errorHandler');
const mongoose = require('mongoose');
const userRoutes = require('./modules/users/routes/users.routes');
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

// Models initialization
require('./models/users.model');

// Middleware to parse JSON reques
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);

// At the end of all routes...
app.use(errorHandler);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
