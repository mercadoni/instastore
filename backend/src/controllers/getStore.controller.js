let getStoreService = require("../services/getStore.service");

export const closestStore = async (req, res) => {
  let request = req.body;

  try {
    let response = getStoreService.getStoreProcess(request);
    res.status(200).json(response);
  } catch (exception) {
    console.log(exception);
    res.status(exception.status).json(exception);
  }
};