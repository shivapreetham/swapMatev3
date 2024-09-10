// models/PrivateRequest.js
const mongoose = require('mongoose');

const privateRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fulfiller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  classDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true }, 
  initialOffer: { type: String, required: true }, // store as encrypted string
  offerIv: { type: String, required: true }, // IV for decryption
  negotiatedPrice: { type: String }, // store as encrypted string
  negotiationIv: { type: String }, // IV for decryption
  isCompleted: { type: Boolean, default: false },
  status: { type: String, default: 'pending' } // 'pending', 'negotiation', 'accepted', 'declined'
}, { timestamps: true });

const PrivateRequest = mongoose.model('PrivateRequest', privateRequestSchema);

module.exports = PrivateRequest;
