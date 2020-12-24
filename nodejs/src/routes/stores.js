var express = require('express');
var router = express.Router();
var dbController = require('../controllers/layerController');

router.get('/closest', function (req, res, next) {
    dbController.getClosestStore(parseFloat(req.query.latitude), parseFloat(req.query.longitude)).then(storesArray => {
        if (storesArray.length < 1) return res.status(204).json({message: 'Not store found'});
        else {
            let storeMap = storesArray[0];
            console.log(storeMap.storeid);
            dbController.getNextDeliveryTime(storeMap.storeid).then(nextDeliveryTimeArray => {
                if (nextDeliveryTimeArray.length > 0) {
                    let nextDeliveryTimeMap = nextDeliveryTimeArray[0];
                    storeMap['nextDeliveryTime'] = nextDeliveryTimeMap.nextdeliverytime;
                } else storeMap['nextDeliveryTime'] = "undefined";
                res.end(JSON.stringify(storeMap));
            }).catch(err => {
                return res.status(500).json({message: 'Internal Error'})
            });
        }
    }).catch(err => {
        return res.status(500).json({message: 'Internal Error'})
    });
});

module.exports = router;
