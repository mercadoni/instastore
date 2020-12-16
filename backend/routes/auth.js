const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const passport = require('passport');

const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;
