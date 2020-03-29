/**
 * Instastore REST API
 */

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const connectDB = require('./api/config/db')
const serverConfig = require('./config')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.json({ store: 'first' })
})

connectDB().then(async () => {
  app.listen(serverConfig.port, function () { console.log('Node server listening on port ' + serverConfig.port) })
})
