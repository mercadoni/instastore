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
      let store = await newStore.save()
      return store
    } catch (error) {
      return error;
    }
  }
}  