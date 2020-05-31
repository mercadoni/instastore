const express = require('express');
const userController = require('./routes/userController');
const storeController = require('./routes/storeController');

//Apply our Api routes to express
module.exports = () => {
	const app = express.Router();
	storeController(app);
	userController(app);

	return app
}