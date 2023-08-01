const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const student = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },


  firstName: {
    type: String,
    //required: true
  },
  lastName: {
    type: String,
  },


  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'female',
  },
  mobileNumber: {
    type: String,
    require: true,
  },
  countryCode: {
    type: String,
    require: true,
  },

  grade: {
    //student qulaification
    type: String,
    immutable: true,
    required: false,
  },

  streams: {
    type: String,
    enum: ['arts', 'science', ''],
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },
});

Student = mongoose.model('Student', student);

module.exports = { Student };
