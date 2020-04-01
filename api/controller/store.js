/**
 * Module to process store orders
 */
const Store = require('../model/store')

const findClosest = async (req, res) => {
  console.log(Store)
  console.log('found')
  return res.status(201).send()
}

module.exports = {
  findClosest,
}
