const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const school = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  medium: {
    //school medium based on language like english, hindi
    type: String,
    enum: ['english', 'hindi', 'english-hindi'],
    default: 'english',
  },

  // user who updates info related to school
  userRole: {
    type: String,
    enum: ['owner', 'director', 'management', 'trusty', 'principal'],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    //index
    type: String,
  },

  contactNumber: {
    type: Number,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
  },
});

const School = mongoose.model('School', school);

module.exports = { School };
