const storesRawData = require('./dataGenerator/storesData.json')
const usersRawData = require('./dataGenerator/userData.json')
const storeController = require('../controllers/storeController');
const authController = require('../controllers/authController');
const Store = require('../models/store')
const User = require('../models/user')

async function populateStores() {
  for (let index = 0; index < storesRawData.length; ++index) {
    let store = await storeController.saveStore(storesRawData[index]);
    console.log(`Saved store ${index} => ${store}`)
  }
}

async function populateUsers() {
  for (let index = 0; index < usersRawData.length; ++index) {
    let user = await authController.signUpUser(usersRawData[index]);
    console.log(`Saved user ${index} => ${user}`)
  }
}

async function cleanDB() {
  await Store.collection.drop()
  await User.collection.drop()
}

module.exports = {
  cleanDB,
  populateStores,
  populateUsers
}
