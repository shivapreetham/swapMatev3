const Attendance = require('../models/Attendance');

// Function to save daily attendance into the Attendance model
const saveDailyAttendance = async (userId, attendanceData) => {
  try {
    const subjects  = attendanceData; // Extracting subjects from the attendance data

    // Debugging logs
    console.log('attendanceData:', attendanceData); // Log the entire attendanceData
    console.log('subjects:', subjects); // Log the extracted subjects

    if (!subjects || subjects.length === 0) {
      throw new Error('Subjects data is missing or empty');
    }

    // Create a new Attendance document
    const newAttendance = new Attendance({
      userId,  // Using userId
      date: Date.now(), // Default to current date
      subjects // Assuming subjects is an array of subject data
    });

    // Save the attendance document in the database
    await newAttendance.save();

    console.log('Attendance saved successfully:', newAttendance);
    return newAttendance; // Return the saved attendance document

  } catch (error) {
    console.error('Error saving attendance:', error.message);
    throw new Error('Failed to save daily attendance');
  }
};

module.exports = { saveDailyAttendance };
