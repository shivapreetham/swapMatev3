const Attendance = require('../models/Attendance');
const DailyAttendance = require('../models/dailyAttendance');
const User = require('../models/User'); // Import your User model

const compareAttendance = async (userId, todayAttendanceData) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  try {
    // Normalize the dates to UTC to avoid timezone issues
    const todayStart = new Date(today.setUTCHours(0, 0, 0, 0));
    const yesterdayStart = new Date(yesterday.setUTCHours(0, 0, 0, 0));

    // Fetch yesterday's attendance
    const yesterdayAttendance = await Attendance.findOne({
      userId: userId,
      date: {
        $gte: yesterdayStart,
        $lt: todayStart
      }
    });

    if (!yesterdayAttendance) {
      console.log('No attendance data found for yesterday. Proceeding with today\'s data...');
      return { success: true, message: 'No attendance data for yesterday (possibly no classes were held).' };
    }

    const classesHeldToday = [];
    const missedClasses = [];

    // Loop through today's attendance data
    todayAttendanceData.forEach((todaySubject) => {
      const yesterdaySubject = yesterdayAttendance.subjects.find(
        (subject) => subject.subjectCode === todaySubject.subjectCode
      );

      if (yesterdaySubject) {
        // Extract attendance totals for today and yesterday
        const [attendedToday, totalClassesToday] = todaySubject.presentTotal.split('/').map(Number);
        const [attendedYesterday, totalClassesYesterday] = yesterdaySubject.presentTotal.split('/').map(Number);

        // Calculate today's attendance details
        const classesHeldTodayCount = totalClassesToday - totalClassesYesterday;
        const attendedTodayCount = attendedToday - attendedYesterday;

        if (classesHeldTodayCount > 0) {
          classesHeldToday.push({
            subjectCode: todaySubject.subjectCode,
            subjectName: todaySubject.subjectName,
            facultyName: todaySubject.facultyName,
            totalClasses: classesHeldTodayCount,
            attendedClasses: attendedTodayCount
          });

          if (attendedTodayCount === 0 && classesHeldTodayCount > 0) {
            missedClasses.push({
              subjectCode: todaySubject.subjectCode,
              subjectName: todaySubject.subjectName,
              totalClassesHeldToday: classesHeldTodayCount
            });
          }
        }
      }
    });

    // Save the daily attendance data into the database
    const dailyAttendance = new DailyAttendance({
      userId: userId,
      date: todayStart, // Save the normalized date
      subjects: classesHeldToday
    });

    await dailyAttendance.save(); // Save to the database

    console.log('Daily attendance saved successfully:', dailyAttendance);

    return { success: true, classesHeldToday, missedClasses };

  } catch (error) {
    console.error('Error comparing or saving attendance:', error);
    throw new Error('Failed to compare or save attendance');
  }
};


const calculateAttendanceMetrics = async (userId, attendanceData) => {
  let overallAttendedClasses = 0;
  let overallTotalClasses = 0;

  // Find the user by userId
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Initialize the subjects array if it's empty
  if (!user.subjects || user.subjects.length === 0) {
    // Populate the subjects array with data from attendanceData
    user.subjects = attendanceData.map(subject => ({
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      attendedClasses: 0, // Defaults to 0 initially
      totalClasses: 0,
      attendancePercentage: 0,
      isAbove75: false,
      classesNeeded: 0,
      classesCanSkip: 0,
    }));
  }

  // Loop through attendanceData and calculate metrics
  attendanceData.forEach(subject => {
    const [attended, total] = subject.presentTotal.split('/').map(Number);
    const attendancePercentage = total > 0 ? (attended / total) * 100 : 0;
    const isAbove75 = attendancePercentage >= 75;
    let classesNeeded = 0;
    let classesCanSkip = 0;

    if (!isAbove75) {
      classesNeeded = Math.ceil((0.75 * total - attended) / 0.25);
    } else {
      classesCanSkip = Math.floor((attended - 0.75 * total) / 0.75);
    }

    // Accumulate overall classes
    overallAttendedClasses += attended;
    overallTotalClasses += total;

    // Find the corresponding subject in the user's subjects array and update it
    const subjectIndex = user.subjects.findIndex(s => s.subjectCode === subject.subjectCode);
    if (subjectIndex !== -1) {
      user.subjects[subjectIndex].attendedClasses = attended;
      user.subjects[subjectIndex].totalClasses = total;
      user.subjects[subjectIndex].attendancePercentage = attendancePercentage;
      user.subjects[subjectIndex].isAbove75 = isAbove75;
      user.subjects[subjectIndex].classesNeeded = classesNeeded;
      user.subjects[subjectIndex].classesCanSkip = classesCanSkip;
    }
  });

  // Calculate overall attendance percentage
  const overallPercentage = overallTotalClasses > 0
    ? (overallAttendedClasses / overallTotalClasses) * 100
    : 0;

  // Update the user's overall metrics
  user.overallAttendedClasses = overallAttendedClasses;
  user.overallTotalClasses = overallTotalClasses;
  user.overallPercentage = overallPercentage;

  // Save the updated user document
  await user.save();

  console.log('Attendance metrics saved successfully!');
};

module.exports = { compareAttendance,calculateAttendanceMetrics };

