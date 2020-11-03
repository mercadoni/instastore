const express = require("express");
const store = require('./store/network');
const logger = require('./logger');
const routes = function(server){
    server.use('/store',store);
}


module.exports = routes;

