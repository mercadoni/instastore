const { check, validationResult } = require('express-validator');
const moment = require('moment')

const utils = require('../utils/utils');
const Store = require('../models/store');

module.exports = {

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

      const userBody = req.body.destination

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

      let availableStores = await Store.find({})

      if (!availableStores.length) {
        // there is no any store to share with our client
        return res.status(200).json({message: 'There is no any store available in this moment, we are so sorry :('})
      } else {

        // This is the base case initialized with a very big value in aproxTimeOfDelivery, bestStoreDistance and closestStoreIndex
        // because they are our values to untie
        let bestAproxTimeOfDelivery = 1e18
        let bestStoreDistance = 1e18
        let closestStoreSoFarIndex = -1
        console.log("userResquestData")
        console.log(userResquestData)

        const clientCoordinates = {
          latitude: userResquestData.latitude,
          longitude: userResquestData.longitude
        }

        // Lets iterate each store and update the closestStore data if:
        // (distance / mediaVelocity) + nextDeliveryTime < bestAproxTimeOfDelivery
        // the mediaVelocity is choosen randomly in the store model
        // if its equal then we untie by distance, if still is equal we keep the current closestStore
        for (let storeIndex = 0; storeIndex < availableStores.length; ++storeIndex) {
          const store = availableStores[storeIndex]
          const storeCoordinates = {
            latitude: store.latitude,
            longitude: store.longitude
          }

          let distanceClientToStore = module.exports.getDistanceToStore(clientCoordinates, storeCoordinates)
          let aproxTimeOfDelivery = (distanceClientToStore / store.mediaVelocity) * 60 // convert it to minutes
          if (store.nextDeliveryTime + aproxTimeOfDelivery <= bestAproxTimeOfDelivery) {
            if (
              store.nextDeliveryTime + aproxTimeOfDelivery === bestAproxTimeOfDelivery &&
              distanceClientToStore < bestStoreDistance
            ) {
              closestStoreSoFarIndex = storeIndex
              bestStoreDistance = distanceClientToStore
            } else {
              bestAproxTimeOfDelivery = store.nextDeliveryTime + aproxTimeOfDelivery
              bestStoreDistance = distanceClientToStore
              closestStoreSoFarIndex = storeIndex
            }
          }
        }
        const closestStore = availableStores[closestStoreSoFarIndex]

        const clientResponse = {
          storeId: closestStore._id,
          storeName: closestStore.storeName,
          distance: bestStoreDistance,
          aproxTimeOfDelivery: moment().add(bestAproxTimeOfDelivery, 'minutes'),
          coordinates: {
              latitude: closestStore.latitude,
              longitude: closestStore.longitude
          },
          isOpen: closestStore.isOpen,
          nextDeliveryTime: closestStore.nextDeliveryTime
        }

        return res.status(200).json(clientResponse)
      }
    }
  ],


  /**
   * This function will calculate the distance between 2 points given longitude and latitude
   * in this time it will use the Haversine formula to find distance between two points on a sphere
   * @see {@link https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/}
   * then it returns the distance in kilometers
   */
  getDistanceToStore(clientCoordinates, storeCoordinates) {
    // constant to convert to radians
    const TO_RADIANS = Math.PI / 180.0;
    const EARTH_RADIUS = 6371;

    let storeLatitude = storeCoordinates.latitude
    let storeLongitude = storeCoordinates.longitude
    let clientLatitude = clientCoordinates.latitude
    let clientLongitude = clientCoordinates.longitude

    // distance between latitudes and longitudes 
    const distanceLatitude = (storeLatitude - clientLatitude) * TO_RADIANS;
    const distanceLongitude = (storeLongitude - clientLongitude) * TO_RADIANS; 

    // convert to radians 
    clientLatitude = clientLatitude * TO_RADIANS; 
    storeLatitude = storeLatitude * TO_RADIANS; 

    // apply formulae 
    let arc = Math.pow(Math.sin(distanceLatitude / 2), 2)
    arc += Math.pow(Math.sin(distanceLongitude / 2), 2) *  Math.cos(clientLatitude) * Math.cos(storeLatitude); 

    const haversine = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc)); 

    return EARTH_RADIUS * haversine; 
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
      let store = await newStore.save();
      return store;
    } catch (error) {
      return error;
    }
  }
}  