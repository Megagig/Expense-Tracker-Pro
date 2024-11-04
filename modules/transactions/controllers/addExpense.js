const mongoose = require('mongoose');
const validator = require('validator');

const addExpense = async (req, res) => {
	try {
		//Import Models:
		const usersModel = mongoose.model('users');
		const transactionsModel = mongoose.model('transactions');
		// destructure the payload
		const { amount, remarks } = req.body;
		if (!amount) throw 'Amount is required';
		if (!remarks) throw 'Remarks is required';
		
		if (amount < 0) throw 'Amount cannot be negative';
		if (remarks.length < 5) throw 'Remarks must be at least 5 characters long';
		
		if (!validator.isNumeric(amount.toString()))
			throw 'Amount must be a valid number';
		
		// if (!req.user || !req.user._id) throw new Error('User not authenticated');
		
		await transactionsModel.create({
			user_id: req.user.id,
			amount: amount * -1,
			remarks: remarks,
			transaction_type: 'expense',
		});
		
		//Update user's balance
		await usersModel.updateOne(
			{
				_id: req.user._id,
			},
			{
				$inc: {
					balance: amount,
				},
			},
			{
				runValidators: true,
			}
		);
		
		res.status(201).json({
			status: 'success',
			message: 'Expense added successfully',
		});
	} catch (error) {
		res.status(400).json({
			status: 'error',
			message: error.message,
		});
	}
};

module.exports = addExpense;
