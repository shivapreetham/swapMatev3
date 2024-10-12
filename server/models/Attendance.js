  const mongoose = require('mongoose');

  const subjectSchema = new mongoose.Schema({
    slNo:{type :String , required:true},
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    facultyName: { type: String, required: true },
    presentTotal: { type: String, required: true },
    attendancePercentage: { type: String, required: true }
  });

  const attendanceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    subjects: [subjectSchema]
  });

  module.exports = mongoose.model('Attendance', attendanceSchema);
