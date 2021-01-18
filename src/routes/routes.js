const express = require('express');
const { getClosestStore } = require('./../controller/store.controller');

const router = express.Router();

// define the home page route
router.get('/store/closest', function(req, res) {
    getClosestStore(req).then( (store) => {
        var code = 200;

        if( !store ) code = 204;

        var response = {
            error: false,
            code: code,
            message: store
        };

        res.send(response);
    } ).catch(err => {
        var response = {
            error: true,
            code: 500,
            message: 'Internal error'
        };

        res.send(response);
    });
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