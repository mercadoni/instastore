const logger = require('../logger');
const db = require("./models/");
const GroceryStore = db.groceryStore;
async function getClosest(expectedDelivery, destination){
    
    return new Promise((resolve, reject) =>{
        if(!expectedDelivery){
            //logger.error("[Controller store.getClosest]:  expectedDelivery null");
            return reject('Datos Incorrectos');
        }
        if(!destination.accuracy){
            destination.accuracy=0;
        }
        GroceryStore.getNearest(expectedDelivery, destination.latitude, destination.longitude, destination.accuracy+1000)
        .then((response) => {
            if(!response){
                return resolve("{}");    
            }else{
                return resolve(response);
            }
        })
        .catch((error) => {
            logger.error("[Controller store.getClosest]: "+error);
            return reject('Datos Incorrectos');
        });
        
        
    });

    
}

module.exports ={
    getClosest,
}