'use strict'

const mongoose = require('mongoose')
const config = require('../config/')

const Store = require('./models/store')
const { STORES } = require('../mocks')

if (!config.db) {
  console.error('please set MONGODB_URL env variable')
  process.exit(1)
}

mongoose.connect(config.db, { useUnifiedTopology: true })
mongoose.connection.on('error', error => {
  console.error('could not connect with mongo', error)
  process.exit(1)
})
mongoose.connection.once('open', async () => {
  if (config.mockStores) {
    await Store.remove()
    await Store.insertMany(STORES)

    console.info('db filled with fake stores')
  }
  console.info('db connected')
})

module.exports = {
  Store
}
