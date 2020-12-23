const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({

storeId: {
    type: Number,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  coordinates : [{
    lat : String,
    lng : String
     }],
  nextDeliveryTime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Store', storeSchema)