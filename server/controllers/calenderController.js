exports.getLast30DaysAttendance = async (req, res) => {
  try {
    // Ensure that req.user is populated by the authorization middleware
    const { collegeEmail } = req.user;

    if (!collegeEmail) {
      console.error('Authorization error: collegeEmail is missing');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const rollNumber = extractRollNumber(collegeEmail);

    if (!rollNumber) {
      console.error('Invalid college email format:', collegeEmail);
      return res.status(400).json({ message: 'Invalid college email format' });
    }

    const today = new Date();
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    console.log(`Fetching attendance records from ${last30Days} to ${today} for roll number: ${rollNumber}`);

    const records = await Attendance.find({
      rollNumber,
      date: { $gte: last30Days, $lte: today }
    }).sort({ date: -1 });

    if (records.length === 0) {
      console.warn(`No records found for roll number: ${rollNumber}`);
      return res.status(404).json({ message: 'No attendance records found for the last 30 days.' });
    }

    const attendanceDetails = records.map(record => ({
      date: record.date.toISOString().split('T')[0],
      subjects: record.subjects.map(subject => ({
        name: subject.name,
        classHeld: subject.classHeld,
        attended: subject.attended,
      }))
    }));

    return res.status(200).json({ attendanceDetails });
  } catch (error) {
    console.error('Error in getLast30DaysAttendance:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
