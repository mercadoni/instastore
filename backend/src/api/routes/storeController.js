const express = require('express');
const route = express.Router();
const storeService = require("../../service/storeService")
const Logger = require('../../service/loggerService')

module.exports = (app) => {
  const logger = new Logger('app')
  app.use('/stores', route);

/**
 * @api {get} /stores/test Prueba de conexion al API
 * @apiName Test
 * @apiGroup Stores
 *
 * @apiSuccess {String} 'First Store'.
 */
  route.get('/test', (req, res) => {
    return res.json({ store: "First Store" });
  });


  /**
 * @api {post} /stores/getClosest Busca la tienda mas cercana
 * @apiName GeTClosest
 * @apiGroup Stores
 * 
 * @apiParam {Position} posicion en formato {"latitude": {Number}, "longitude": {Number}} 
 *
 * @apiSuccess {Store} {
        storeId: store.code,
        storeName: store.name,
        isOpen: true,
        coordinates: { latitude: store.latitude, longitude: store.longitude },
        nextDeliveryTime: store.nextDeliveryTime,
        status: "OK"
      }.
 */
  route.post('/getClosest', async (req, res) => {
    const location = req.body
    logger.info(`/getClosest request recibido ${location.latitude}, ${location.longitude}`)
    const store = await storeService.getClosest(location)
    if (store) {
      logger.info(`/getClosest response tienda ${store.code} para request ${location.latitude}, ${location.longitude}`)

      return res.json({
        storeId: store.code,
        storeName: store.name,
        isOpen: true,
        coordinates: { latitude: store.latitude, longitude: store.longitude },
        nextDeliveryTime: store.nextDeliveryTime,
        status: "OK"
      });
    } else {
      logger.error(`/getClosest no se encontraron tiendas para las coordenadas ${location.latitude}, ${location.longitude}`)
      return res.json({
        status: "NO_RESULT"
      })
    }

  });

  /**
 * @api {post} /stores/getNearby Busca las tiendas mas cercana
 * @apiName GetNearby
 * @apiGroup Stores
 * 
 * @apiParam {Position} posicion en formato {"latitude": {Number}, "longitude": {Number}} 
 *
 * @apiSuccess {Store[]} {
        storeId: store.code,
        storeName: store.name,
        isOpen: true,
        coordinates: { latitude: store.latitude, longitude: store.longitude },
        nextDeliveryTime: store.nextDeliveryTime,
        status: "OK"
      }.
 */
  route.post('/getNearby', async (req, res) => {
    const location = req.body
    logger.info(`/getNearby request recibido ${location.latitude}, ${location.longitude}`)
    const stores = await storeService.getNearby(location)

    logger.info(`/getNearby se encuentran ${stores.length} para request ${location.latitude}, ${location.longitude}`)

    return res.json({ stores });
  });

 /**
 * @api {get} /stores/initdb Busca la tienda mas cercana
 * @apiName InitDb
 * @apiGroup Stores
 * 
 * @apiSuccess {Number} numero de tiendas creadas
 */
  route.get('/initdb', async (req, res) => {
    if (process.env.NODE_ENV === "development") {

      logger.info("/initdb se inicia creacion BD")

      const storeLength = await storeService.initdb();
      return res.json({ storeLength });
    } else {
      logger.error("/initdb intento de creacion en prod")
      return res.json({ store: "Action not allowed on " + process.env.NODE_ENV });
    }
  });
};