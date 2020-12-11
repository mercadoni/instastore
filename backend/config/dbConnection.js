const mongoose = require('mongoose');
const { db } = require('../models/store');

const env = process.env.NODE_ENV || 'dev';
const dbConfig = require('./db-' + env);

const options = {
    autoIndex: false,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  console.log(dbConfig.db)
  mongoose.connect(dbConfig.db, options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

module.exports = {
  connect: function() {
    connectWithRetry();
  }
}