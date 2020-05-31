
const express = require("express");
const config = require("./config");
const apiConfig = require("./apiInitialize");
const Logger = require('./service/loggerService')
const logger = new Logger('app')

async function startServer() {
  const app = express();
  app.listen(config.port, err => {
    if (err) {
      process.exit(1);
      return;
    }
    logger.info(`Server listening on port: ${config.port}`);
  });
}

startServer();