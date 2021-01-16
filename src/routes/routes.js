const express = require('express');
const database = require('./../util/db');

const router = express.Router();

function resolve(req) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT Store.StoreId, Store.StoreName, Store.CoordinateLatitude, Store.CoordinateLongitude, haversine(Store.CoordinateLatitude, Store.CoordinateLongitude, " + req.query.latitude + ", " + req.query.longitude + ") as distance, filtered.StartsAt, filtered.EndsAt FROM Store "
                + "LEFT JOIN "
                + "( SELECT * FROM `instastore`.`Schedule` WHERE WeekDay = WEEKDAY(CURDATE()) AND CURTIME() BETWEEN StartsAt and EndsAt) as filtered "
                + "ON ( Store.StoreId = filtered.StoreId) "
                + "ORDER BY distance ASC LIMIT 1;";
        
        database.query(
            query,
            function (err, result) {
                if (err) throw err;
                
                closestStore = result[0];

                var response = {
                    storeId: closestStore.StoreId,
                    storeName: closestStore.StoreName,
                    isOpen: (closestStore.StartsAt != null),
                    coordinates: {
                        latitude: closestStore.CoordinateLatitude,
                        longitude: closestStore.CoordinateLongitude
                    },
                    nextDeliveryTime: null
                }

                resolve(response);
            }
        );
    });    
}

// define the home page route
router.get('/store/closest', function(req, res) {
    resolve(req).then( (store) => { 
        var response = {
            error: false,
            code: 200,
            message: store
        };

        res.send(response);
    } );
   });

router.use(function(req, res, next) {
    respuesta = {
        error: true, 
        codigo: 404, 
        mensaje: 'URL no encontrada'
    };

    res.status(404).send(respuesta);
});

module.exports = router;