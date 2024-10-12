const mongoose = require('mongoose');

const dailyAttendanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // Reference to the user
  date: { type: Date, default: Date.now },       // Date of the record
  subjects: [
    {
      subjectCode: { type: String, required: true },
      subjectName: { type: String, required: true },
      facultyName: { type: String, required: true },
      attendedClasses: { type: Number, required: true },  // Attended classes today
      totalClasses: { type: Number, required: true }      // Total classes held today
    }
  ]
});

// Prevent model overwrite if already declared
module.exports = mongoose.models.DailyAttendance || mongoose.model('DailyAttendance', dailyAttendanceSchema);
