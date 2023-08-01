const mongoose = require('mongoose');
const Schema = mongoose.Schema;

user = new Schema({
  email: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    min: 4,
    max: 16,
    require: true,
  },
  passwordConf: {
    type: String,
    min: 4,
    max: 16,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    default: '',
    require: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
  },

});


User = mongoose.model('User', user);
module.exports = { User };
