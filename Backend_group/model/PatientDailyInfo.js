const mongoose = require('mongoose');

const patientDailyInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for referencing
    required: true,
  },
  pulseRate: Number,
  bloodPressure: String,
  weight: Number,
  temperature: Number,
  respiratoryRate: Number,
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when a new document is created
  },
});

module.exports = mongoose.model('PatientDailyInfo', patientDailyInfoSchema);
