const { getClosestStoreService } = require('./../service/store.service');

const getClosestStore = (req) => {
    return new Promise(function (resolve, reject) {
        getClosestStoreService(req.query.latitude, req.query.longitude).then( (result) => {
            var response = {
                storeId: result.StoreId,
                storeName: result.StoreName,
                isOpen: (result.StartsAt != null),
                coordinates: {
                    latitude: result.CoordinateLatitude,
                    longitude: result.CoordinateLongitude
                },
                nextDeliveryTime: null
            }

            resolve(response);
        } );
    });    
}

module.exports = {
    getClosestStore
}