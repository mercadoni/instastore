import { getManager } from "typeorm";
import { getStores, findStoresInCity, findStoresInstate } from "./db";
import { Response, Request } from "express";
import { IDestination, ICityPoint } from "../../shared/types";
import { getCitiesCoordinates } from "../../services/mapsClient";
import { getHaversineDistance } from "./service";
import { Store } from "../../entities/Store";

export const getAllStores = async (request: Request, response: Response) => {
  const dbManager = getManager();
  try {
    const stores = await getStores(dbManager);

    return stores;
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};

export const getStoresByCity = async (request: Request, response: Response) => {
  const dbManager = getManager();
  try {
    const destination: IDestination = request.body.destination;
    const stores = await findStoresInCity(dbManager, destination.city);

    return stores;
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};

export const getNearestStore = async (request: Request, response: Response) => {
  const dbManager = getManager();
  try {
    const destination: IDestination = request.body.destination;
    let stores = await findStoresInCity(dbManager, destination.city);

    if (stores.length === 0) {
      const stateStores = await findStoresInstate(dbManager, destination.state);
      if (stateStores.length === 0) {
        return [];
      }
      const citiesUnderState = new Set<string>();

      stateStores.forEach((store) => citiesUnderState.add(store.city));
      citiesUnderState.delete(destination.city);

      //get coords for every city
      console.log("stores are", destination.state, stateStores);
      let citiesCoords: Array<ICityPoint> = await getCitiesCoordinates(
        citiesUnderState.keys()
      );
      let userCoords: ICityPoint = {
        city: destination.city,
        latitude: destination.latitude,
        longitude: destination.longitude,
      };

      console.log("cities retived", citiesCoords);

      //rank cities by distance
      const orderedCities = citiesCoords
        .map((coord) => {
          const distance = getHaversineDistance(userCoords, coord);
          return {
            ...coord,
            distance,
          };
        })
        .sort((a, b) => (a.distance | 0) - (b.distance | 0));
      console.log("ordered Cities", orderedCities);

      // filter out by the two first cities
      stores = stateStores.filter((store) => {
        return orderedCities
          .slice(0, 2)
          .some((cityP) => cityP.city === store.city)
          ? true
          : false;
      });
    }

    const sortedByCoords: Partial<Store[]> = stores
      .map((coord) => {
        let { city, latitude, longitude } = coord;
        const distance = getHaversineDistance(
          ({ city, latitude, longitude } = destination),
          ({ city, latitude, longitude } = coord)
        );
        return {
          ...coord,
          distance,
        };
      })
      .sort((a, b) => (a.distance | 0) - (b.distance | 0));

    return [sortedByCoords[0]] || [];
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};
