const { check, validationResult } = require('express-validator');

const utils = require('../utils/utils');
const Store = require('../models/store');

module.exports = {


  /**
   * get all the stores in the DB
   */
  getStores: async (req, res, next) => {
    try {
      const stores = await Store.find({})
      res.status(200).json(stores)
    } catch (error) {
      next(error)
    }
  },


  /**
   * get the closest store given an address among the ones saved on the DB 
   */
  getClosestStore: [
    // Validating the body fields with express validator
    check('destination.name').trim()
      .isLength({ min: 1 })
      .withMessage('The name is required'),
    check('destination.address').trim()
      .isLength({ min: 1 })
      .withMessage('The address is required'),
    check('destination.country').trim()
      .isAlpha()
      .withMessage('Must be composed only by letters')
      .isLength({ min: 2, max: 2 }) // according to ISO-3166-1 (two-letter)
      .withMessage('Must be exactly 2 chars long'),
    check('destination.latitude')
      .isNumeric()
      .withMessage('Must be a number'),
    check('destination.longitude')
      .isNumeric()
      .withMessage('Must be a number'),

    async (req, res, next) => {
      // If there is any error while validate the fields given on the request
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const userBody = req.body

      // get the user payload 
      const userResquestData = {
        name: userBody.name,
        address: userBody.address,
        address_two: userBody.address_two ? userBody.address_two : '',
        description: userBody.description ? userBody.description : '',
        country: userBody.country,
        city: userBody.city ? userBody.city : '',
        state: userBody.state ? userBody.state : '',
        zip_code: userBody.zip_code ? userBody.zip_code : '',
        latitude: Number(userBody.latitude),
        longitude: Number(userBody.longitude)
      }
      return res.status(200).json(userBody)
    }
  ],


  /**
   * This is going to be used for populate stores and aint to be an endpoint
   */
  saveStore: async (storeData) => {
    // Lets suppose that the stores open from 8 am to 10 am
    const LOWER_OPENING = 8;
    const UPPER_OPENING = 10;

    // Lets suppose that the stores close from 6 pm to 11 pm
    const LOWER_CLOSING = 18;
    const UPPER_CLOSING = 23;
    try {
      let openingTime = utils.getRandomNumberBetweenRange(LOWER_OPENING, UPPER_OPENING) * 60;
      let closingTime = utils.getRandomNumberBetweenRange(LOWER_CLOSING, UPPER_CLOSING) * 60;
      let nextDeliveryTime = utils.getRandomNumberBetweenRange(openingTime, closingTime);

      storeData = {
        ...storeData,
        openingTime: openingTime,
        closingTime: closingTime,
        nextDeliveryTime: nextDeliveryTime
      }

      const newStore = new Store(storeData);
      let store = await newStore.save();
      return store;
    } catch (error) {
      return error;
    }
  }
}  