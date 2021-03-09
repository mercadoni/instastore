'use strict'

const terminate = require('./terminate')
const { validate, getCloseDistanceFromOnePoint } = require('./lib')

module.exports = {
  terminate,
  validate,
  getCloseDistanceFromOnePoint
}
