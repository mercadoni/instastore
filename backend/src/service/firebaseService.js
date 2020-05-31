const admin = require('firebase-admin');

module.exports = {
    //check if the user is logged
    auth(idToken) {
        admin.auth().verifyIdToken(idToken)
            .then(function (decodedToken) {
                let uid = decodedToken.uid;
                console.log(uid)
            }).catch(function (error) {
                console.log(error)
            });
    }
}