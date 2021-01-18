const database = require('./../util/db');
const { logger } = require('./../util/log');

const getClosestStoreService = ( latitude, longitude ) => {
    logger.debug('Enter getClosestStoreService service');
    return new Promise(function (resolve, reject) {
        var query = "SELECT Store.StoreId, Store.StoreName, Store.CoordinateLatitude, Store.CoordinateLongitude, haversine(Store.CoordinateLatitude, Store.CoordinateLongitude, ?, ?) as distance, filtered.StartsAt, filtered.EndsAt FROM Store "
                + "LEFT JOIN "
                + "( SELECT * FROM `instastore`.`Schedule` WHERE WeekDay = WEEKDAY(CURDATE()) AND CURTIME() BETWEEN StartsAt and EndsAt) as filtered "
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

module.exports = {
    getClosestStoreService
}