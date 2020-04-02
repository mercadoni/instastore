/**
 * MongoDB connection
 */

const mongoose = require('mongoose')
const serverConfig = require('../../config')
const { stores } = require('../../seed_db')
const Store = require('../model/store')
const mongoDB = serverConfig.mongoURL

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.error('DB Connection failed ' + error)
  }
}

const disconnectDB = async () => {
  await mongoose.connection.close()
}

const closeTestDB = async () => {
  await mongoose.connection.dropDatabase()
  await disconnectDB()
}

const fillDB = async () => {
  try {
    await Store.insertMany(stores)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Clean collection between tests
 */
const removeAllFromCollection = async (name) => {
  const collection = mongoose.connection.collections[name]
  await collection.deleteMany()
}

module.exports = {
  connectDB,
  closeTestDB,
  removeAllFromCollection,
  disconnectDB,
  fillDB,
}
