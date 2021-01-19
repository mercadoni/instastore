const express = require('express');
const { logger } = require('./../util/log');
const { getClosestStore } = require('./../controller/store.controller');

const router = express.Router();

// define the home page route
router.get('/store/closest', function(req, res) {
    logger.debug('Enter /store/closest endpoint');
    getClosestStore(req).then( (store) => {
        var code = 200;

        if( !store ) code = 204;

        var response = {
            message: store
        };

        logger.info('Endpoint responses: %d', code);

        res.status(code).send(response);
    } ).catch(err => {
        var response = {
            message: 'Internal error'
        };

        logger.error('Endpoint responses: 500');

        res.status(500).send(response);
    });
   });

router.use(function(req, res, next) {
    response = { 
        message: 'URL not found'
    };

    res.status(404).send(response);
});

module.exports = router;