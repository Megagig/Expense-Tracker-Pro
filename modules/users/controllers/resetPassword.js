const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailManager = require("../../../managers/emailManager");
const resetPassword = async (req, res) => {
	const usersModel = mongoose.model('users');
	
	const {email, reset_code, new_password, confirm_new_password} = req.body;
	
	// Validate email
	if(!email)  throw  "Email is required";
	// Check if email exists
	const getUser = await usersModel.findOne({
		email: email
	});
	if(!getUser) throw "Email not found";
	
	// Validate reset code
	if(!reset_code) throw "Reset code is required";
	if(reset_code !== getUser.reset_code) throw "Invalid reset code";
	
	// Validate password
	if(!new_password) throw "New password is required";
	if(new_password !== confirm_new_password) throw "New password and confirm new password must match";
	if(new_password.length < 6) throw "Password must be at least 6 characters";
	
	// Update password
	const hashedPassword = await bcrypt.hash(new_password, 12);
	
	await usersModel.updateOne({
		email: email
	}, {
		password: hashedPassword,
		reset_code: null
	},{
		runValidators: true
		});
	
	//send email
	await emailManager(
		email,
		"Your password has been reset successfully, if you did not perform this action, please contact us immediately",
		"Your password has been reset successfully, if you did not perform this action, please contact us immediately",
		"Password reset successfully - Expense tracker PRO"
	);
	
	res.status(200).json({
		status: 'Password reset successfully'
	})
	
}
module.exports = resetPassword;