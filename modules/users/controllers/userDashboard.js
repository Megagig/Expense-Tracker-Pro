const mongoose = require('mongoose');
const userDashboard = async (req, res) => {
  // Import User model from models folder
  const usersModel = mongoose.model('users');
  console.log(req.user);
  //Get the user ID from req.user, set by the auth middleware
  // Query the database to find the user with the ID
  const getUser = await usersModel
    .findOne({
      _id: req.user.id,
    })
    .select('-password'); // Exclude the password from the response

    // Send the user data in the response
  res.status(200).json({
    status: 'Success!',
    data: getUser,
  });
};

module.exports = userDashboard;
