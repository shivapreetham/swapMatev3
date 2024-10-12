const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token and get the decoded data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Look for the user based on the decoded userId
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (!req.user) {
      return res.status(404).json({ message: 'User not found in the middleware' });
    }

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;
