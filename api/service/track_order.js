/**
 * Tracks all params of orders
 */
const Order = require('../model/order')

const track = async (req, res, next) => {
  try {
    const ord = await Order.create(req.body)
    ord.user = req.user
    await ord.save()
    req.order = ord._id
  } catch (error) {
    console.error(error)
  } finally {
    next()
  }
}

module.exports = track
