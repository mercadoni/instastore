/**
 * Module to access/import env settings.
 */

const dotenv = require('dotenv')

dotenv.config()

const config = {
  mongoURL: process.env.MONGODB_URL,
  port: process.env.PORT,
}

module.exports = config
