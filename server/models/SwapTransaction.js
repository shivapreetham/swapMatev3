const mongoose = require('mongoose');

const SwapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  transactions: [{
    amount: Number,
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['earn', 'spend'] }
  }]
});

module.exports = mongoose.model('Token', SwapSchema);
