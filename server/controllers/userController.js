const userService = require('../services/userService');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserProfile(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Upload profile picture
const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.uploadProfilePic(userId, req.file);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete profile picture
const deleteProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteProfilePic(userId);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Set avatar
const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const { avatar } = req.body;

    const result = await userService.setAvatar(userId, avatar);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users except logged-in user
const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await userService.allUsers(loggedInUser);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};
// ... Other controller functions remain the same

// Edit profile
const editUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body; // Contains fields like username, webUsername, webPassword, personalEmail

    const updatedUser = await userService.editUserProfile(userId, updateData);

    if (updatedUser.error) {
      return res.status(404).json({ message: updatedUser.error });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getUserProfile,
  uploadProfilePic,
  deleteProfilePic,
  setAvatar,
  allUsers,
  getAllUsers,
  editUserProfile,
};
