const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api');
const config = require('../config');
const compression = require('compression');
const Logger = require('../service/loggerService')

exports.initialize = (app) => {

  const logger = new Logger('app')
  //for better performance
  app.use(compression());

  //if we're behind a proxy 
  app.enable('trust proxy');

  // Enabled Cross-domain request
 
  app.use(cors());

  //Transforms the raw string of req.body into json
  app.use(bodyParser.json());
  //Set the routes in the /api
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    logger.error(err)
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    logger.error(err)
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
}

