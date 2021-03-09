'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  nextDeliveryTime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('store', schema)
