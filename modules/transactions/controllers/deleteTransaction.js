const mongoose = require('mongoose');
const deleteTransaction = async (req, res) => {
	const transactionsModel = mongoose.model('transactions');
	  const { id } = req.params;
  const transaction = await transactionsModel.findById(id);
  if (!transaction) {
	return res.status(404).json({ error: 'Transaction not found' });
  }
	await transaction.deleteOne();
  res.json({ message: 'Transaction deleted' });

}

module.exports = deleteTransaction;