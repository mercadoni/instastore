const express = require("express");
const route = express.Router();
const userService = require("../../service/userService")
const Logger = require('../../service/loggerService')

module.exports = (app) => {
  const logger = new Logger('app')
  
  app.use('/users', route);

  /**
 * @api {get} /users/me Prueba de conexión API
 * @apiName Me
 * @apiGroup Users
 */
  route.get('/me', (req, res) => {
    logger.info("simple test")
    return res.json({ user: "John Doe" });
  });

  /**
 * @api {post} /users/auth Autentica un usuario usando un token de firebase
 * @apiName Auth
 * @apiGroup Users
 * 
 * @apiParam {String} token generado por Firebase
 *
 * @apiSuccess {String} UID del usuario logeado
 */
  route.post('/auth', async (req, res) => {
    const userToken = req.body

    const uid = await userService.verifyUserToken(userToken)
    if(uid){
      logger.info(`usuario con token ${userToken} autenticado`)
    }else{
      logger.error(`no fue posible autenticar al usuariocon token ${userToken}`)
    }
    return res.json({ uid: uid });
  });


/*
  * @api {post} /users/getLocation retorna latitud y longitud dada una direccion
  * @apiName GetLocation
  * @apiGroup Users
  * 
  * @apiParam {String} Direccion 
  *
  * @apiSuccess {Json} Objeto con la latitud y longitud de la direccion dad
  */

  route.post('/getLocation', async (req, res) => {
    try {
      const address = req.body
      logger.info(`request recibido para direccion ${address.address}`)
      const location = await userService.getLocation(address)

      if(location.status === "OK"){
        logger.info(`coordenadas obtenidas para ${address.address}`)
      }else{
        logger.error(`no se pudo localizar la direccion ${address.address}`)
      }
      
      return res.json({ location });
    }catch(error){
      logger.error(error)
      return res.json(error);
    }
    
  });
};