import {
  Client,
  Status,
  GeocodeResponse,
} from "@googlemaps/google-maps-services-js";
import { ICityPoint } from "../shared/types";

const API_KEY = "AIzaSyAJp1JumsmnVpapbc2zM_gJdiMyPDnkVhY";

const client = new Client({});

export const getCitiesCoordinates = async (
  cities: Iterable<string> | Array<string>
) => {
  let citieCoords: Array<ICityPoint> = [];

  console.log("keys", cities);
  for await (let city of cities) {
    console.log("ind", city);

    await client
      .geocode({
        params: {
          key: API_KEY,
          address: city,
        },
        timeout: 2000,
      })
      .then((response: GeocodeResponse) => {
        console.log("res from goog", response);
        if (response.data.status === Status.OK) {
          console.log(response.data.results[0]);
          const { lat, lng } = response.data.results[0].geometry.location;
          citieCoords.push({
            city,
            lat,
            lng,
          });
        } else {
          console.error(
            `no lat found for ${city} ${response.data.error_message}`
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return citieCoords;
};
