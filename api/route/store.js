/**
 * Setup store routes
 */
const express = require('express')
const StoreController = require('../controller/store')
const trackOrderService = require('../service/track_order')

var router = express.Router()

router.use(trackOrderService)
router.post('/order', StoreController.findClosest)

module.exports = router
