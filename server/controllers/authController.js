const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

function extractRollNumber(collegeEmail) {
  const pattern = /2023ugcs(\d{3})@nitjsr\.ac\.in/;
  const match = collegeEmail.match(pattern);
  return match ? match[1] : '';
}

exports.registerUser = async (req, res) => {
  const { username, password, collegeEmail, personalEmail, webUserName, webPassword } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const rollNumber = extractRollNumber(collegeEmail);
    if (!rollNumber) {
      return res.status(400).json({ message: 'Invalid college email formatting' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      collegeEmail,
      personalEmail,
      webUserName, 
      webPassword
    });

    if (user) {
      res.status(201).json({
        _id: user._id,  
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.authUser = async (req, res) => {
  console.log('Request Body:', req.body);

  const { username, password } = req.body;

  try {
    // Ensure that username is a string before querying
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      console.log("Token generated:", token);
      res.json({
        _id: user._id,  
        username: user.username,
        token,
      }
    );
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};