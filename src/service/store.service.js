const database = require('./../util/db');
const { logger } = require('./../util/log');

const getClosestStoreService = ( latitude, longitude ) => {
    logger.debug('Enter getClosestStoreService service');
    return new Promise(function (resolve, reject) {
        var query = "SELECT Store.StoreId, Store.StoreName, Store.CoordinateLatitude, Store.CoordinateLongitude, haversine(Store.CoordinateLatitude, Store.CoordinateLongitude, ?, ?) as distance, filtered.StartsAt, filtered.EndsAt, (CURTIME() BETWEEN StartsAt and EndsAt) as isOpen FROM Store "
                + "LEFT JOIN "
                + "( SELECT * FROM `instastore`.`Schedule` /*WHERE WeekDay = WEEKDAY(CURDATE()) AND CURTIME() BETWEEN StartsAt and EndsAt*/) as filtered "
                + "ON ( Store.StoreId = filtered.StoreId) "
                + "WHERE filtered.StartsAt IS NOT NULL AND filtered.EndsAt IS NOT NULL "
                + "HAVING distance <= 5 "
                + "ORDER BY distance ASC LIMIT 1;";

        database.query(
            query,
            [latitude, longitude],
            function (err, result) {
                if(err) { 
                    reject(err);

                    return;
                }

                closestStore = result[0];

                resolve( closestStore );
            }
        );
    } );
}

const getNextDeliveryTime = (store) => {
    logger.debug('Enter getNextDeliveryTime service');
    return new Promise(function (resolve, reject) {
        var query = "SELECT getNextTimeDelivery(?) as response;";
        console.log(store);
        console.log(query);
        database.query(
            query,
            [store],
            function (err, result) {
                if(err) { 
                    reject(err);

                    return;
                }
                console.log(result);

                nextDelivery = result[0];

                resolve( nextDelivery );
            }
        );
    } );
}

module.exports = {
    getClosestStoreService,
    getNextDeliveryTime
}