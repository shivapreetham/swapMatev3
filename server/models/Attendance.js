const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  classHeld: { type: Boolean, required: true },
  attended: { type: Boolean, required: true }, 
});

const attendanceSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  date: { type: Date, required: true },
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
