const { logger } = require('./../util/log');
const { getClosestStoreService } = require('./../service/store.service');

const getClosestStore = (req) => {
    logger.debug('Enter getClosestStore controller');
    return new Promise(function (resolve, reject) {
        getClosestStoreService(req.query.latitude, req.query.longitude).then( (store) => {
            var response  = null;
            if( store != null ){
                var response = {
                    storeId: store.StoreId,
                    storeName: store.StoreName,
                    isOpen: (store.StartsAt != null),
                    coordinates: {
                        latitude: store.CoordinateLatitude,
                        longitude: store.CoordinateLongitude
                    },
                    nextDeliveryTime: null
                };
            }

            resolve(response);
        } ).catch(err => {
            reject(err);
        });
    });    
}

module.exports = {
    getClosestStore
}