const storesRawData = require('./dataGenerator/data.json')
const storeController = require('../controllers/storeController');
const Store = require('../models/store')

async function populateStores() {
  for (let index = 0; index < storesRawData.length; ++index) {
    let store = await storeController.saveStore(storesRawData[index]);
    console.log(`Saved store ${index} => ${store}`)
  }
}

async function cleanDB() {
  await Store.collection.drop()
}

module.exports = {
  cleanDB,
  populateStores,
}