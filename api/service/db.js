/**
 * MongoDB connection
 */

const mongoose = require('mongoose')
const serverConfig = require('../../config')

const mongoDB = serverConfig.mongoURL

const connectDB = async (name) => {
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

const closeTestDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

/**
 * Clean database between tests
 */
const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

module.exports = {
  connectDB,
  closeTestDB,
  removeAllCollections,
}
