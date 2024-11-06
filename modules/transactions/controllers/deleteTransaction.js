const mongoose = require('mongoose');
const validator = require('validator');
const deleteTransaction = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');
	const usersModel = mongoose.model('users');
	// destructure the payload
	  const { id } = req.params;
	  
	  if (!validator.isMongoId(id.toString())) throw 'please provide a valid  transaction id';
  const transaction = await transactionsModel.findById(id);
  if (!transaction) {
	return res.status(404).json({ error: 'Transaction not found' });
  }
  
  // update user's balance based on transaction type
	 if (transaction.transaction_type === 'income') {
		 //income logic
		 await usersModel.updateOne(
			 {
				 _id: transaction.userId
			 },
			 {
				 $inc: {
					 balance: transaction.amount * -1,
				 },
			 },
			 {
				 runValidators: true,
			 }
		 );
	
	 }else {
		 //expense logic
		 await usersModel.updateOne(
			 {
				 _id: transaction.userId,
			 },
			 {
				 $inc: {
					 balance: transaction.amount,
				 },
			 },
			 {
				 runValidators: true,
			 }
		 );
		 
	 }
	await transactionsModel.deleteOne({
			_id: id,
	});
  res.json({ message: 'Transaction deleted' });

}

module.exports = deleteTransaction;