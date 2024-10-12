const express = require('express');
const router = express.Router();
const { scrapeAttendanceData } = require('../controllers/puppetController');
const protect = require('../middlewares/authMiddleware');

// Apply protect to all routes in this router
router.use(protect);

// Route to trigger Puppeteer scraper
router.post('/scrape', scrapeAttendanceData);

module.exports = router;
