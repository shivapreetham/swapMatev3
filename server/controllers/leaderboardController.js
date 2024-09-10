const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    const { sortBySubject } = req.query; // Get the query parameter if any

    const users = await User.find();

    // Prepare leaderboard data
    const leaderboard = users.map((user) => {
      const subjectAttendancePercentage = {};

      const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'subject6', 'subject7'];

      subjects.forEach((subject) => {
        const data = user[subject];
        if (data.totalClasses > 0) {
          subjectAttendancePercentage[subject] = data.attendancePercentage;
        } else {
          subjectAttendancePercentage[subject] = 0;
        }
      });

      const overallAttendancePercentage = (user.overallAttendedClasses / user.overallTotalClasses) * 100;

      return {
        username: user.username,
        collegeEmail: user.collegeEmail,
        overallAttendancePercentage: isNaN(overallAttendancePercentage) ? null : overallAttendancePercentage,
        subjectAttendancePercentage,
        subjectData: subjects.map((subject) => {
          const { attendedClasses, totalClasses, attendancePercentage, isAbove75, classesNeeded, classesCanSkip } = user[subject];
          return {
            subject,
            attendedClasses,
            totalClasses,
            percentage: attendancePercentage,
            isAbove75,
            classesNeeded,
            classesCanSkip
          };
        }),
        subjectAttendanceFilled: overallAttendancePercentage > 75,
      };
    });

    // Filter out users with null overall attendance percentage
    const filteredLeaderboard = leaderboard.filter(user => user.overallAttendancePercentage !== null);

    // Sort by overall attendance percentage in descending order by default
    if (sortBySubject) {
      filteredLeaderboard.sort((a, b) => (b.subjectAttendancePercentage[sortBySubject] || 0) - (a.subjectAttendancePercentage[sortBySubject] || 0));
    } else {
      filteredLeaderboard.sort((a, b) => b.overallAttendancePercentage - a.overallAttendancePercentage);
    }

    return res.status(200).json({ leaderboard: filteredLeaderboard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
