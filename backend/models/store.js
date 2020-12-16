const mongoose = require('mongoose');
const moment = require('moment');

const utils = require('../utils/utils');

const Schema = mongoose.Schema;

let StoreSchema = new Schema(
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

// Virtual for know if the store is open right now
StoreSchema.virtual('isOpen').get(() => {
  let currentTime = moment()
  currentTime = currentTime.hour() * 60 + currentTime.minutes() // hours * 60 + minutes
  return this.openingTime <= currentTime && currentTime <= this.closingTime;
});

/**
 * Virtual for know the media velocity of the delivery time for each store
 * this time it is going to be choose ramdonly just for practise
 * and always will be in the range 30-60 Km/hr
 */
StoreSchema.virtual('mediaVelocity').get(() => {
  return utils.getRandomNumberBetweenRange(30, 60);
});

module.exports = mongoose.model('Store', StoreSchema);
