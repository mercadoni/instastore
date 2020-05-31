const firebaseService = require("./firebaseService")
const geoService = require("./geoService")

module.exports = {
    //check if the user is logged
    async verifyUserToken(idToken) {
        const uid = await firebaseService.auth(idToken)
        return uid;
    },
    async getLocation(address) {
        const location = await geoService.getLocation(address);
        
        return location;
    }

}