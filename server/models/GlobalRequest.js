const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  fulfillerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bidPrice: { type: Number, required: true }
}, { timestamps: true });

const globalRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  classDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  minBid: { type: Number, required: true },
  maxBid: { type: Number, required: true },
  bidEndTime: { type: Date, required: true },
  bids: [{ fulfiller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, bidPrice: Number }],
  selectedBid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

const GlobalRequest = mongoose.model('GlobalRequest', globalRequestSchema);

module.exports = GlobalRequest;
