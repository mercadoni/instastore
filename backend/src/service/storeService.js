const storeModel = require("../model/storeModel")
const geoService = require("../service/geoService")
const moment = require('moment-timezone');
//assume that a store takes an average of 20 minutes (1200 sec) to prepare a purchase
const prapareTime = 1200;


module.exports = {
    async initdb() {
        const storeLength = await storeModel.initDb()
        return storeLength;
    },
    async getClosest(location) {
        const { latitude, longitude } = location;
        const limit = geoService.getGeoHashLimits(latitude, longitude, 5);

        let store = await storeModel.getClosest(limit);
        if (store) {
            const distance = await this.getDistance(
                { lat: latitude, lng: longitude },
                { lat: store.latitude, lng: store.longitude }
            )
            //5 mins per km
            const trafficTime = 300 * distance.distance / 1000
            const delay =  Math.random() * (2000 - 1200) + 1200

            bestDeliveryTime = moment(new Date()).tz('America/Bogota').add(distance.duration + prapareTime + trafficTime, 'seconds')
            //cause 20 min is the avarage
            worstDeliveryTime = moment(new Date()).tz('America/Bogota').add(distance.duration + prapareTime + trafficTime + delay, 'seconds')

            store.nextDeliveryTime = {
                bestDeliveryTime: bestDeliveryTime.format("HH:mm").valueOf(),
                worstDeliveryTime: worstDeliveryTime.format("HH:mm").valueOf()
            }
        } 

        return store;
    },
    async getNearby(location) {
        const { latitude, longitude } = location;
        const limit = geoService.getGeoHashLimits(latitude, longitude, 10);
        const stores = await storeModel.getNearby(limit);
        return stores;
    },
    async getDistance(userLocation, storeLocation) {
        return await geoService.getDistance(userLocation, storeLocation);
    }
}