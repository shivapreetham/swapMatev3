const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { getLast30DaysAttendance} =require('../controllers/calenderController');
const { getLeaderboard } = require('../controllers/leaderboardController'); // Correct path to leaderboardController
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/mark', protect, markAttendance);
router.get('/get', protect, getAttendance);
router.get('/calender', protect, getLast30DaysAttendance);
router.get('/leaderboard', protect, getLeaderboard); 

module.exports = router;
