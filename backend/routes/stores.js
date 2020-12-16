const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken')

const storeController = require('../controllers/storeController');

router.post('/closest-store', auth, storeController.getClosestStore);

module.exports = router;
