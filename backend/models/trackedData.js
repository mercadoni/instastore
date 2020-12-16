const mongoose = require('mongoose');
const moment = require('moment');

const utils = require('../utils/utils');

const Schema = mongoose.Schema;

let TrackedDataSchema = new Schema(
  {
    nameAddress: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    store:{
      type: Schema.ObjectId,
      ref: 'Store'
    }  
  }
);

module.exports = mongoose.model('TrackedData', TrackedDataSchema);
