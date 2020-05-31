const admin = require('firebase-admin');
const serviceAccount = require("../config/serviceAccountKey.json");

exports.initialize = async () =>{
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://instastore-cc392.firebaseio.com"
    });
}
