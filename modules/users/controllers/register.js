const mongoose = require('mongoose');

const register = async (req, res) => {
  const usersModel = mongoose.model('users');
  const { name, email, password, confirm_password, balance } = req.body;

  //validation

  if (!name) throw 'Name is required';
  if (!email) throw 'Email is required';
  if (!password) throw 'Password is required';
  if (password !== confirm_password)
    throw 'Password and confirm password must match';
  if (password.length < 6) throw 'Password must be at least 6 characters';

  //validation for dupb
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw 'This Email Already Exists';

  await usersModel.create({
    name: name,
    email: email,
    password: password,
    balance: balance,
  });

  res.status(201).json({
    status: 'User Registered Successfully!',
  });
};

module.exports = register;
