const getTransactions = (req, res) => {
	res.status(200).json({ message: 'Get transactions' });
};
module.exports = getTransactions
