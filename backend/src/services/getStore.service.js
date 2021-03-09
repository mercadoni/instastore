import { locations } from "./../utils/locations";
import findNearestLocation from "map-nearest-location";

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

  return store;
};

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
