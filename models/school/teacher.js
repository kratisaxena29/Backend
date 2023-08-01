const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const teacher = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolId: {
    type: ObjectId,
    ref: 'School',
  },
  firstName: {
    //index
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  profileImage: {
    type: String,
    default: '',
  },
  email: {
    //index
    type: String,
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

const Teacher = mongoose.model('Teacher', teacher);

module.exports = { Teacher };
