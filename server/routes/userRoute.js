const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getUserProfile,
  uploadProfilePic,
  deleteProfilePic,
  setAvatar,
  getAllUsers,
  editUserProfile
} = require('../controllers/userController');
const upload = require('../middlewares/fileMiddleware');
router.use(protect);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id/edit', editUserProfile);
router.post('/profile/:id/upload', upload.single('profilePic'), uploadProfilePic);

router.delete('/profile/:id/profile-pic', deleteProfilePic);

router.post('/profile/:id/avatar', setAvatar);

router.get('/allusers', getAllUsers);
module.exports = router;
