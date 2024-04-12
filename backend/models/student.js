const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: Number,
    min: 1,
    max: 12
  },
  // Add other fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
