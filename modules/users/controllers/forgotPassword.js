const mongoose = require('mongoose');
const emailManager = require("../../../managers/emailManager");
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
	await emailManager(
		email,
		"Your password reset code is " + resetCode,
		"Your password reset code is " + resetCode,
		"Reset your password - Expense tracker PRO"
	);
	
	res.status(200).json({
		status: 'Reset code sent to email successfully'
	})
}
module.exports = forgotPassword;
