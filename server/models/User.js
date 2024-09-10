const bcrypt = require( 'bcryptjs');
const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
  attendedClasses: { type: Number, default: 0 },
  totalClasses: { type: Number, default: 0 },
  attendancePercentage: { type: Number, default: 0 },
  isAbove75: { type: Boolean, default: false },
  classesNeeded: { type: Number, default: 0 },
  classesCanSkip: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeEmail: { type: String, required: true, unique: true },
  personalEmail: { type: String, required: true },
  profilePic: { type: String, default: '' },
  subject1: { type: subjectSchema, default: () => ({}) },
  subject2: { type: subjectSchema, default: () => ({}) },
  subject3: { type: subjectSchema, default: () => ({}) },
  subject4: { type: subjectSchema, default: () => ({}) },
  subject5: { type: subjectSchema, default: () => ({}) },
  subject6: { type: subjectSchema, default: () => ({}) },
  subject7: { type: subjectSchema, default: () => ({}) },
  overallAttendedClasses: { type: Number, default: 0 },
  overallTotalClasses: { type: Number, default: 0 },
  overallPercentage: { type: Number, default: 0 },
  totalCheck: { type: Boolean, default: true },
  loginDays: { type: Number, default: 0 }, // Track the number of days logged in
  attendanceDays: { type: Number, default: 0 }, // Number of days attendance was marked
  loginStreak: { type: Number, default: 0 }, // Current streak of consecutive login days
  lastLoginDate: { type: Date, default: null }, // Last login date
  profilePic: { type: String }, // URL of the profile picture
  avatar: { type: String }, // Selected avatar
  honorScore: { type: Number, default: 100 },
  swaps: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports =User;
