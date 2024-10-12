const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  console.log(userId);
  console.log('generateToken');
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};


module.exports = generateToken;
