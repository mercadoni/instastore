const admin = require('firebase-admin');
const seed = require("./seed")


// Seed array, provided for the test


module.exports = {
    //set a geohash for query the nearbys stores
    async initDb() {
        for await (store of seed) {
            const position = geoService.getGeoHash(store.latitude, store.longitude);
            store.position = position
            admin.firestore().collection("store").add(store)
        }
        return { storeLength: seed.length }
    },
    async getClosest(limit) {
        const stores = await admin.firestore().collection('store')
            .where("position", ">=", limit.lower)
            .where("position", "<=", limit.upper)
            .orderBy("position", "asc")
            .limit(1)
            .get()
           
        const closestStore = stores.docs.map(store => store.data())[0]
        return closestStore
    },
    async getNearby(limit) {
        const stores = await admin.firestore().collection('store')
            .where("position", ">=", limit.lower)
            .where("position", "<=", limit.upper)
            .orderBy("position")
            .get()
           
        const closestStore = stores.docs.map(store => store.data())
        return closestStore
    }
}