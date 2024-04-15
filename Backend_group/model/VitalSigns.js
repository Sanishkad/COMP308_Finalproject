const mongoose = require('mongoose');

const vitalSignsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bodyTemperature: Number,
  heartRate: Number,
  bloodPressure: String, 
  respiratoryRate: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('VitalSigns', vitalSignsSchema);
