const mongoose = require('mongoose');
const validator = require('validator');
const deleteTransaction = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');
	  const { id } = req.params;
	  
	  if (!validator.isMongoId(id.toString())) throw 'please provide a valid  transaction id';
  const transaction = await transactionsModel.findById(id);
  if (!transaction) {
	return res.status(404).json({ error: 'Transaction not found' });
  }
	await transaction.deleteOne();
  res.json({ message: 'Transaction deleted' });

}

module.exports = deleteTransaction;