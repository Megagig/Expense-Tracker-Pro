const auth = (req, res, next) => {
  console.log('Hello from Middleware');

  // For now, we'll pass the request to the next function
  next();
};

module.exports = auth;
