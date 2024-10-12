const { scrapeAttendance } = require('../services/attendanceScraper');
const { compareAttendance } = require('../services/attendanceProcessor');
const { saveDailyAttendance } = require('../services/attendanceSaver');
const { calculateAttendanceMetrics } = require('../services/attendanceProcessor');
const User = require('../models/User');
const dailyAttendance = require('../models/dailyAttendance');

const scrapeAttendanceData = async (req, res) => {
  const userId = req.headers['user_id'] || req.body.user_id;
  
  if (!userId) {
    return res.status(400).json({ success: false, message: 'user_id is required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user || !user.webUserName || !user.webPassword) {
      return res.status(400).json({ success: false, message: 'User or web credentials not found' });
    }

    const { webUserName, webPassword } = user;
    const todayAttendanceData = await scrapeAttendance(webUserName, webPassword);
    const newAttendance = await saveDailyAttendance(userId, todayAttendanceData);

    const attendanceInsights = await compareAttendance(userId, todayAttendanceData);
    console.log("camparing done");
    console.log(attendanceInsights);
    await calculateAttendanceMetrics(userId, todayAttendanceData);

    res.json({ success: true, todayData: todayAttendanceData, insights: attendanceInsights });

  } catch (error) {
    console.error('Error in attendance scraping or processing:', error);
    res.status(500).json({ success: false, message: 'Failed to scrape attendance data', error: error.message });
  }
};

module.exports = { scrapeAttendanceData };
