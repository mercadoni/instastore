/**
 * Setup store routes
 */
const express = require('express')
const StoreController = require('../controller/store')

var router = express.Router()

router.post('/order', StoreController.findClosest)

module.exports = router
