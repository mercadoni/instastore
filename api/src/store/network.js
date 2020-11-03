const express = require("express");
const router = express.Router();

const response  = require('../response');
const controller = require('./controller')
const logger = require('../logger');

router.post('/closest', function (req, res) {
    logger.info('[POST Request] store/getClosest ', { "body": req.body});
    controller.getClosest(req.body.expectedDelivery, req.body.destination)
        .then((answer) => {
            
            response.success(req, res, answer, 200);
        })
        .catch(() => {
            console.log("Entro al error");
            response.error(req, res, 'Datos Incorrectos', 400);
        });
});

module.exports = router;