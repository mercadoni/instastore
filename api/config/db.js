/**
 * Setup MongoDB connection
 */

const mongoose = require('mongoose')
const serverConfig = require('../../config')

const mongoDB = serverConfig.mongoURL

const connectDB = () => mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => console.log('DB connection successful!'))

module.exports = connectDB
