const mongoose = require('mongoose');
const populateDB = require('./populateDB')

const env = process.env.NODE_ENV || 'Dev';
const dbConfig = require(`./db${env}`);

async function connection() {
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const connection = mongoose.connection
  connection.once('open', async () => {
    console.log('Connected to MongoDB :)')
    await populateDB.cleanDB()
    await populateDB.populateStores()
    await populateDB.populateUsers()
  })

  mongoose.connect(dbConfig.db, dbOptions)
}

module.exports = {
  connection
}