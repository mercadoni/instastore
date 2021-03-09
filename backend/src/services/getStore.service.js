import { locations } from "./../utils/locations";
import findNearestLocation from "map-nearest-location";
import moment from 'moment';

export const getStoreProcess = (request) => {
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
  store['nextDeliveryTime'] = getNextDeliveryTime(store);

  return store;
};

let checkIsOpen = (request) => {
  let timeFormat = 'hh:mm'
  var actualTime = moment()
  let openingDate = moment(request.openingDate, timeFormat);
  let closingDate = moment(request.closingDate, timeFormat);

  return actualTime.isBetween(openingDate, closingDate)
}

let getNextDeliveryTime = (request) =>{
  
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
