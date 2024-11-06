const mongoose = require('mongoose');
const validator = require('validator');

const editTransaction = async(req, res) => {
	const transactionsModel = mongoose.model('transactions');
	
	// Get the transaction ID from the payload
	const {transactionId, amount,remarks, transaction_type} = req.body;
	
	//Validation
	if(!transactionId) throw new Error('Transaction ID is required');
	if (!validator.isMongoId(transactionId.toString())) throw 'please provide a valid  transaction id';
	if (transaction_type !== "income" && transaction_type !== "expense") throw 'please provide a valid transaction type:income or expense';
	
	// Find the transaction
	const transaction = await transactionsModel.findById(transactionId);
	if (!transaction) {
		return res.status(404).json({ error: 'Transaction not found' });
	}
	
	// Update the transaction
	await transactionsModel.updateOne({
		_id: transactionId
	}, {
		amount,
		remarks,
		transaction_type
	},{
		runValidators: true
	})
	res.status(200).json({
		status: 'Transaction updated successfully'
		
		
	})
}

module.exports = editTransaction;