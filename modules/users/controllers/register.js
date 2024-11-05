const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require('../../../managers/jwtManager');
const nodemailer = require('nodemailer');

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

  //validation for duplicate email.
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw 'This Email Already Exists';

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 12);

 const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);
  
    //send email
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "8466610b8c9428",
            pass: "7ae546b8af1bee"
        }
    });
    
    
   await transport.sendMail({
        to:createdUser.email,
        from: "info@expensetracker.com",
        text: "Welcome to Expense Tracker PRO. We are excited to have you on board. Enjoy the app",
       html: "<h1>Welcome to Expense Tracker PRO</h1><p>We are excited to have you on board. Enjoy the app</p>",
        subject: "Welcome to Expense Tracker",
    
    })
    
  res.status(201).json({
    status: 'User Registered Successfully!',
    accessToken: accessToken,
  });
};

module.exports = register;
