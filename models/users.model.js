const mongoose = require('mongoose');

// setup the Schema
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    default: 0,
  },
});

// Create the model
const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;
