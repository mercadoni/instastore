import { locations } from "./../utils/locations";
import findNearestLocation from "map-nearest-location";
import moment from 'moment';
require('dotenv').config()
const fetch = require('node-fetch');

export const getStoreProcess = async (request) => {
  checkCoordinates(request);

  let coordinates = locations.map((location) => {
    return location.coordinates;
  });

  const nearestLocation = findNearestLocation(request, coordinates);

  let store = locations.find((location) => {
    return (
      location.coordinates.lat == nearestLocation.location.lat &&
      location.coordinates.lng == nearestLocation.location.lng
    );
  });

  store['distance'] = nearestLocation.distance;
  store['isOpen'] = checkIsOpen(store);
  store['nextDeliveryTime'] = await getNextDeliveryTime(request,store);


  return store;
};

let checkIsOpen = (request) => {
  let timeFormat = 'hh:mm'
  var actualTime = moment()
  let openingDate = moment(request.openingDate, timeFormat);
  let closingDate = moment(request.closingDate, timeFormat);

  return actualTime.isBetween(openingDate, closingDate)
}

let getNextDeliveryTime = async (userCoords, request) =>{
  let timeFormat = 'hh:mm'
  let estimatedTime;
  let estimatedTimeFormatted;

  if (request.isOpen){
    try {
       await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?=&origins=${request.coordinates.lat},${request.coordinates.lng}&destinations=${userCoords.lat}%2C${userCoords.lng}&key=${process.env.GOOGLE_KEY}`)
      .then(res => res.json())
      .then(json => {

        let estimatedBikeTime = (json.rows[0].elements[0].duration.value) / 60
        estimatedTime = (request.queuedOrders*20) + estimatedBikeTime
        var mins_num = parseFloat(estimatedTime, 10);
        var hours   = Math.floor(mins_num / 60);
        var minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        estimatedTimeFormatted = hours.toString()+':'+minutes.toString()

        if (moment().add("60", 'minutes').format('LTS').isSameOrAfter(moment(request.closingDate, timeFormat))){
          let tomorrowDate = moment(request.openingDate, "hh:mm:")
          .add(estimatedTimeFormatted, 'minutes')
          .format('hh:mm');
          estimatedTimeFormatted = "The order will be delivered tomorrow in approx. " + tomorrowDate
        }

      });
    } catch (error) {
      console.error(error)
      return "It is not possible to ship at this time, please try again later.";
    }

   return estimatedTimeFormatted
  }else{
    return "The store is not open, please try again tomorrow";
  }
}

let checkCoordinates = (request) => {
 
  if (
    typeof request.lng !== "number" ||
    typeof request.lat !== "number" ||
    request.lng < -180 ||
    request.lng > 180 ||
    request.lat < -90 ||
    request.lat > 90
  ) {
    let coordinatesException = {
      message:
        "Latitude must be between -90 and 90. Longitude must be between -180 and 180. Both must be numeric",
      status: 400,
    };
    throw coordinatesException;
  }
};
