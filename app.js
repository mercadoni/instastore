/**
 * Instastore REST API
 */

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./api/route/user')
const app = express()

app.use(logger('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRouter)
app.get('/', function (req, res) {
  res.json({ store: 'first' })
})

module.exports = app
