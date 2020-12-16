const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');

router.post('/closest-store', storeController.getClosestStore);

module.exports = router;
