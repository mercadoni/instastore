const pino = require('pino');
const expressPino = require('express-pino-logger');
const config = require('./../config/config');

const logger = pino({ level: config.logs || 'info' });
const expressLogger = expressPino({ logger });

module.exports = {
    logger,
    expressLogger
}