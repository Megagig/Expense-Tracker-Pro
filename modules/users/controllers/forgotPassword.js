const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const forgotPassword =  async (req, res) => {

	const usersModel = mongoose.model('users');
	
	const {email} = req.body;
	
	// Validate email
	if(!email)  throw  "Email is required";
	// Check if email exists
	const getUser = await usersModel.findOne({
		email: email
	});
	if(!getUser) throw "Email not found";
	
	// Generate a reset code (5 random digits)
	const resetCode = Math.floor(10000 + Math.random() * 90000);
	
	// Save the reset code to the user
	
	await usersModel.updateOne({
		email: email
	}, {
		reset_code: resetCode
	},{
		runValidators: true
		});
	
	// Send the reset code to the user's email
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
		to:email,
		from: "info@expensetracker.com",
		text: "Your reset code is " + resetCode,
		html:  "Your reset code is " + resetCode,
		subject: "Reset Your Password Expense Tracker PRO",
		
	})
	
	
	
	
	res.status(200).json({
		status: 'Reset code sent to email successfully'
	})
}
module.exports = forgotPassword;
