const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { getLast30DaysAttendance } = require('../controllers/calenderController');
const { getLeaderboard } = require('../controllers/leaderboardController'); 
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// Routes
router.get('/get', getAttendance);
router.get('/calender', getLast30DaysAttendance);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
