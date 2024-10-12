const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protect = require('../middlewares/authMiddleware');

// Apply protect to all routes in this router
router.use(protect);

// Get user profile
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/updateProfilePic', async (req, res) => {
  try {
    const { profilePic } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profilePic = profilePic;
    await user.save();

    res.json({ message: 'Profile picture updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
