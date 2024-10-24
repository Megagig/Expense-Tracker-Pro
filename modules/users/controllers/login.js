const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
  const usersModel = mongoose.model('users');
  const { email, password } = req.body;

  //validation
  if (!email) throw 'Email is required';
  if (!password) throw 'Password is required';

  //check if user exists
  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw 'Invalid Credentials';

  //compare password the user provided and the one in the database using the bycrpt compare
  const isPasswordValid = await bcrypt.compare(password, getUser.password);
  if (!isPasswordValid) throw 'email and password do not match';

  //Success response
  res.status(201).json({
    status: 'success',
    Message: 'User Logged In Successfully',
  });
};
module.exports = login;
