/**
 * Module to access/import env settings.
 */

const dotenv = require('dotenv')

dotenv.config()

const test = process.env.NODE_ENV === 'test'

const config = {
  mongoURL: test ? 'mongodb://127.0.0.1/test' : process.env.MONGODB_URL,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
}

module.exports = config
