const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  uploadProfilePic,
  deleteProfilePic,
  setAvatar,
  getAllUsers
} = require('../controllers/userController');
const upload = require('../middlewares/fileMiddleware');

router.get('/profile/:id', getUserProfile);

router.post('/profile/:id/upload', upload.single('profilePic'), uploadProfilePic);

router.delete('/profile/:id/profile-pic', deleteProfilePic);

router.post('/profile/:id/avatar', setAvatar);

router.get('/allusers', getAllUsers);
module.exports = router;
