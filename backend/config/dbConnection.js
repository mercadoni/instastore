const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'Dev';
const dbConfig = require(`./db${env}`);

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
  mongoose.connect(dbConfig.db, options).then(()=>{
    console.log('MongoDB is connected');
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
    setTimeout(connectWithRetry, 5000);
  })
}

module.exports = {
  connect: function() {
    connectWithRetry();
  }
}