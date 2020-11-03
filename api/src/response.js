const logger = require('./logger');

/**
 * Por defecto responde JSON
 * @param {*} req 
 * @param {*} res 
 * @param {*} message 
 * @param {*} status 
 */
exports.success = function(req, res, message, status){
    res.setHeader('Content-Type', 'application/json');
    res
        .status(status || 200 )
        .send(
            message
        )
}

exports.error = function(req, res, message, status, details){

    res.setHeader('Content-Type', 'application/json');
    res
        .status(status || 500 )
        .send(
            {
                error:message
               
            }
        )
    logger.error("[Response Error]",{detalles:details})
}