const User = require('../models/User');
const Attendance = require('../models/Attendance');
const DailyAttendance = require('../models/DailyAttendance');

exports.getAttendance = async (req, res) => {
  try {
    // Use req.user._id from the authenticated user
    const userId = req.user._id;

    console.log('Fetched userId:', userId);  // Add console log to verify

    const attendanceData = await Attendance.findOne({ userId });
    if (!attendanceData) {
      return res.status(404).json({ message: 'Attendance data not found' });
    }

    const dailyAttendanceData = await DailyAttendance.find({ userId })
      .sort({ date: -1 })
      .limit(7);

    const dailyAttendance = dailyAttendanceData.length > 0 ? dailyAttendanceData : [];

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found in getAttendance' });
    }

    const response = {
      attendanceData: {
        subjects: attendanceData.subjects,
        overallTotalClasses: attendanceData.overallTotalClasses,
        overallAttendedClasses: attendanceData.overallAttendedClasses,
        overallPercentage: attendanceData.overallPercentage,
        totalCheck: attendanceData.totalCheck,
      },
      dailyAttendance: dailyAttendance,
      userAttendanceMetrics: {
        overallTotalClasses: user.overallTotalClasses,
        overallAttendedClasses: user.overallAttendedClasses,
        overallPercentage: user.overallPercentage,
        totalCheck: user.totalCheck,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
