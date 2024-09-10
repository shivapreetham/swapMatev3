const User = require('../models/User');
const Attendance = require('../models/Attendance');
const calculateAttendance = require('./recordController');

function extractRollNumber(collegeEmail) {
  const pattern = /2023ugcs(\d{3})@nitjsr\.ac\.in/;
  const match = collegeEmail.match(pattern);
  return match ? match[1] : '';
}

const incrementHonorScore = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.honorScore += 2;
      await user.save();
    }
  } catch (error) {
    console.error('Error incrementing honor score:', error.message);
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { collegeEmail } = req.user;
    const { date, subjects } = req.body;

    const rollNumber = extractRollNumber(collegeEmail);
    if (!rollNumber) {
      return res.status(400).json({ message: 'Invalid college email format' });
    }

    // Validate subjects array
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: 'Invalid subjects data' });
    }

    const existingRecord = await Attendance.findOne({ rollNumber, date });
    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance for this date has already been marked.' });
    }

    // Ensure all subjects have the required fields
    const validatedSubjects = subjects.map(subject => ({
      name: subject.name || 'Unknown',
      classHeld: subject.classHeld !== undefined ? subject.classHeld : false,
      attended: subject.attended !== undefined ? subject.attended : false,
    }));

    // Save attendance record
    const attendance = new Attendance({ rollNumber, date, subjects: validatedSubjects });
    await attendance.save();

    const user = await User.findOne({ collegeEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let totalCheck = true;

    incrementHonorScore(user._id);

    validatedSubjects.forEach((subject) => {
      const { name, classHeld, attended } = subject;

      if (!name || typeof name !== 'string') return;

      const subjectNumber = name.match(/\d+/)?.[0];
      if (!subjectNumber) return;

      const subjectKey = `subject${subjectNumber}`;

      if (!user[subjectKey]) {
        user[subjectKey] = { totalClasses: 0, attendedClasses: 0, attendancePercentage: 0, isAbove75: false, classesNeeded: 0, classesCanSkip: 0 };
      }

      if (classHeld) {
        user[subjectKey].totalClasses += 1;
        user.overallTotalClasses += 1;

        if (attended) {
          user[subjectKey].attendedClasses += 1;
          user.overallAttendedClasses += 1;
        }

        const { attendancePercentage, isAbove75, classesNeeded, classesCanSkip } = calculateAttendance(
          user[subjectKey].attendedClasses,
          user[subjectKey].totalClasses
        );

        user[subjectKey].attendancePercentage = attendancePercentage;
        user[subjectKey].isAbove75 = isAbove75;
        user[subjectKey].classesNeeded = classesNeeded;
        user[subjectKey].classesCanSkip = classesCanSkip;

        if (!isAbove75) totalCheck = false;
      }
    });

    user.totalCheck = totalCheck;

    user.overallPercentage = (user.overallAttendedClasses / user.overallTotalClasses) * 100;

    // Update login streak and attendance days
    const currentDate = new Date().setHours(0, 0, 0, 0); // Ignore time part
    const lastLoginDate = user.lastLoginDate ? new Date(user.lastLoginDate).setHours(0, 0, 0, 0) : null;
    if (lastLoginDate === null || lastLoginDate !== currentDate) {
      user.loginDays += 1;
      user.lastLoginDate = new Date();

      if (lastLoginDate !== null && currentDate === new Date(lastLoginDate).setDate(new Date(lastLoginDate).getDate() + 1)) {
        user.loginStreak += 1;
      } else {
        user.loginStreak = 1; // Reset streak
      }
    }

    // Increase attendanceDays if this is the first attendance marking for the day
    const attendanceCountForToday = await Attendance.countDocuments({ rollNumber, date });
    if (attendanceCountForToday === 1) { // Only count if this was the first record added today
      user.attendanceDays += 1;
    }

    await user.save();

    return res.status(201).json({ message: 'Attendance marked successfully!', attendance });
  } catch (error) {
    console.error('Error in marking attendance:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


exports.getAttendance = async (req, res) => {
  try {
    const { collegeEmail } = req.user;

    const rollNumber = extractRollNumber(collegeEmail);
    if (!rollNumber) {
      return res.status(400).json({ message: 'Invalid college email format' });
    }

    const user = await User.findOne({ collegeEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const attendanceRecords = {};

    for (let i = 1; i <= 7; i++) {
      const subjectKey = `subject${i}`;
      const subject = user[subjectKey];
      if (subject) {
        attendanceRecords[subjectKey] = {
          attendedClasses: subject.attendedClasses,
          totalClasses: subject.totalClasses,
          attendancePercentage: subject.attendancePercentage,
          isAbove75: subject.isAbove75,
          classesNeeded: subject.classesNeeded,
          classesCanSkip: subject.classesCanSkip
        };
      }
    }

    return res.status(200).json({
      attendanceRecords,
      overallTotalClasses: user.overallTotalClasses,
      overallAttendedClasses: user.overallAttendedClasses,
      overallPercentage: user.overallPercentage,
      totalCheck: user.totalCheck
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
