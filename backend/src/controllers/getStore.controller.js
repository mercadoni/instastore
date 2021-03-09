const logger = require('./../utils/logger')
// Declaracion del servicio a usar
let getStoreService = require("../services/getStore.service");


export const closestStore = async (req, res) => {
  let request = req.body;
  logger.info("closestStore Process")
  logger.info("Request: " + JSON.stringify(request))

  // Uso del servicio, el cual retorna 200 en caso de ser satisfactorio o su respectivo mensaje y codigo de error en caso de fallar
  try {
    let response = await getStoreService.getStoreProcess(request);
    res.status(200).json(response);
    logger.info("Finishing process with HTTP Code: " + 200 + " and answer: "+ JSON.stringify(response))
  } catch (exception) {
    console.log(exception);
    res.status(exception.status).json(exception);
    logger.error("Finishing process with HTTP Code: " + exception.status)
  }
};