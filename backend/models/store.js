var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoreSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
    },
    openingTime: {
      type: Number,
      required: true,
    },
    closingTime: {
      type: Number,
      required: true,
    },
    nextDeliveryTime: {
      type: Number,
      required: true,
    },
  }
);

module.exports = mongoose.model('Store', StoreSchema);
