const bcrypt = require( 'bcryptjs');
const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
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

  webUserName: {type:String ,unique:true},
  webPassword: {type:String },

  subjects:[subjectSchema],
  

  overallAttendedClasses: { type: Number, default: 0 },
  overallTotalClasses: { type: Number, default: 0 },
  overallPercentage: { type: Number, default: 0 },


  totalCheck: { type: Boolean, default: true },
  loginDays: { type: Number, default: 0 },
  attendanceDays: { type: Number, default: 0 }, 
  loginStreak: { type: Number, default: 0 }, 
  lastLoginDate: { type: Date, default: null },
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
