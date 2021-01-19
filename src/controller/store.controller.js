const { logger } = require('./../util/log');
const { getClosestStoreService, getNextDeliveryTime } = require('./../service/store.service');

const getClosestStore = (req) => {
    logger.debug('Enter getClosestStore controller');
    return new Promise(function (resolve, reject) {
        getClosestStoreService(req.query.latitude, req.query.longitude).then( (store) => {
            if( !store ){
                resolve(null);
            }
            else {
                getNextDeliveryTime(store.StoreId).then( (nextDeliveryTime) => {
                    var response = {
                        storeId: store.StoreId,
                        storeName: store.StoreName,
                        isOpen: store.isOpen,
                        coordinates: {
                            latitude: store.CoordinateLatitude,
                            longitude: store.CoordinateLongitude
                        },
                        nextDeliveryTime: nextDeliveryTime.response
                    };

                    resolve(response);
                } ).catch(err => {
                    reject(err);
                });;
            }
        } ).catch(err => {
            reject(err);
        });
    });    
}

module.exports = {
    getClosestStore
}