/**
 * Store Model
 */
const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nextDeliveryTime: {
    type: Date,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
})

const Store = mongoose.model('Store', StoreSchema)

module.exports = Store
