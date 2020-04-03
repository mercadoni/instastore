/**
 * Order Model
 * Tracks all the calls made to the /store endpoint
 */
const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  description: {
    type: String,
  },
  placementTime: {
    type: Date,
  },
  name: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  address_two: {
    type: String,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
  nextDeliveryTime: {
    type: Date,
  },
})

OrderSchema.pre('save', async function (next) {
  this.placementTime = Date.now()
  next()
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
