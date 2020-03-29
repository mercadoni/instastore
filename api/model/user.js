/***
 * User Model
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 8

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
})

UserSchema.pre('save', async function (next) {
  // Hash the password before saving the user
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

UserSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    throw new Error('Invalid login credentials')
  }
  return user
}

const User = mongoose.model('User', UserSchema)

User.createIndexes()

module.exports = User
