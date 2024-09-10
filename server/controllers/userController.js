const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get user profile
// @route   GET /api/user/profile/:id
// @access  Public (for now, without middleware)
const getAllUsers= async (req, res) => {
  try {
    const users = await User.find({}, 'username collegeEmail');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password -subject1 -subject2 -subject3 -subject4 -subject5 -subject6 -subject7');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Upload user profile picture
// @route   POST /api/user/profile/:id/upload
// @access  Public (for now, without middleware)
const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const profilePicPath = `/uploads/${req.file.filename}`;
    user.profilePic = profilePicPath;
    user.avatar = null; // Clear avatar if a profile picture is uploaded
    await user.save();

    res.json({ profilePic: profilePicPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user profile picture
// @route   DELETE /api/user/profile/:id/delete
// @access  Public (for now, without middleware)
const deleteProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profilePicPath = path.join(__dirname, '..', 'public', user.profilePic);
    
    if (fs.existsSync(profilePicPath)) {
      fs.unlinkSync(profilePicPath); // Delete the file from the server
    }

    user.profilePic = null;
    await user.save();

    res.json({ message: 'Profile picture deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Set user avatar
// @route   POST /api/user/profile/:id/avatar
// @access  Public (for now, without middleware)
const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const { avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = avatar;
    user.profilePic = null; // Clear profile picture if an avatar is selected
    await user.save();

    res.json({ avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

module.exports = { getUserProfile, uploadProfilePic, deleteProfilePic, setAvatar, allUsers, getAllUsers };
