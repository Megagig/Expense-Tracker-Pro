const mongoose = require('mongoose');
const userDashboard = async (req, res) => {
  // Import User model (assuming it’s already defined in your project)
  const usersModel = mongoose.model('users');
  console.log(req.user);
  //Get the user ID from req.user, set by the auth middleware
  const getUser = await usersModel
    .findOne({
      _id: req.user.id,
    })
    .select('-password');

  res.status(200).json({
    status: 'Success!',
    data: getUser,
  });
};

module.exports = userDashboard;
