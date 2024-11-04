const mongoose = require('mongoose');
const userDashboard = async (req, res) => {
  // Import User model from models folder
  const usersModel = mongoose.model('users');
  const transactionsModel = mongoose.model('transactions');
  console.log(req.user);
  //Get the user ID from req.user, set by the auth middleware
  // Query the database to find the user with the ID
  const getUser = await usersModel
    .findOne({
      _id: req.user.id,
    })
    .select('-password'); // Exclude the password from the response
  
    // Query the database to find all transactions for the user
    const transactions = await transactionsModel.find({
        user_id: req.user.id,
    }).sort({createdAt: -1}).limit(5) // Sort the transactions by createdAt in descending order and limit to 5
 

    // Send the user data in the response
  res.status(200).json({
    status: 'Success!',
    data: getUser,
    transactions: transactions,
  });
};

module.exports = userDashboard;
