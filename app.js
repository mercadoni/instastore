/**
 * Instastore REST API
 */

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./api/route/user')
const app = express()

// Setup API documentation
const swaggerUi = require('swagger-ui-express')
const openAPIDocument = require('./openapi.json')

app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(openAPIDocument))

app.use(logger('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', userRouter)

module.exports = app
