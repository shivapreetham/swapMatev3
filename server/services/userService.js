const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Get all users with specific fields
const getAllUsers = async () => {
  return await User.find({}, 'username collegeEmail');
};

// Get a specific user's profile
const getUserProfile = async (userId) => {
  return await User.findById(userId).select('-password -subject1 -subject2 -subject3 -subject4 -subject5 -subject6 -subject7');
};

// Upload profile picture
const uploadProfilePic = async (userId, file) => {
  const user = await User.findById(userId);

  if (!user || !file) return { error: 'User not found or no file uploaded' };

  const profilePicPath = `/uploads/${file.filename}`;
  user.profilePic = profilePicPath;
  user.avatar = null; // Clear avatar if profile picture is uploaded
  await user.save();
  
  return { profilePic: profilePicPath };
};

// Delete profile picture
const deleteProfilePic = async (userId) => {
  const user = await User.findById(userId);

  if (!user) return { error: 'User not found' };

  const profilePicPath = path.join(__dirname, '..', 'public', user.profilePic);
  
  if (fs.existsSync(profilePicPath)) fs.unlinkSync(profilePicPath);

  user.profilePic = null;
  await user.save();
  
  return { message: 'Profile picture deleted' };
};

// Set avatar for user
const setAvatar = async (userId, avatar) => {
  const user = await User.findById(userId);

  if (!user) return { error: 'User not found' };

  user.avatar = avatar;
  user.profilePic = null; // Clear profile pic if avatar is set
  await user.save();

  return { avatar };
};

// Get all users except logged in user
const allUsers = async (loggedInUserId) => {
  return await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");
};
// ... Other service functions remain the same

// Edit user profile
const editUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) return { error: 'User not found' };

  // Update the necessary fields
  if (updateData.username) user.username = updateData.username;
  if (updateData.personalEmail) user.personalEmail = updateData.personalEmail;
  if (updateData.webUsername) user.webUsername = updateData.webUsername;
  if (updateData.webPassword) user.webPassword = updateData.webPassword;

  await user.save();
  return user;
};

module.exports = {
  getAllUsers,
  getUserProfile,
  uploadProfilePic,
  deleteProfilePic,
  setAvatar,
  allUsers,
  editUserProfile, // Export editUserProfile function
};


