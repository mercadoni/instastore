const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);