/**
 * Instastore REST API
 */

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const userRouter = require('./api/route/user')
const storeRouter = require('./api/route/store')
const authService = require('./api/service/auth')
const app = express()

// Setup API documentation
const swaggerUi = require('swagger-ui-express')
const openAPIDocument = './openapi.json'
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator

app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(require(openAPIDocument)))

app.use(logger('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Setup openapi request validator
new OpenApiValidator({
  apiSpec: openAPIDocument,
})
  .install(app)
  .then(() => {
    app.use('/user', userRouter)
    app.use('/store', authService.verifyToken, storeRouter)

    app.use((err, req, res, next) => {
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      })
    })
  })

module.exports = app
