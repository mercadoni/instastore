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
  geocoding_url: process.env.LOCATIONIQ_URL,
  geocoding_api_key: process.env.LOCATIONIQ_API_KEY,
}

module.exports = config
