import { getManager } from "typeorm";
import { getStores } from "./db";
import { Response, Request } from "express";

export const getAllStores = async (request: Request, response: Response) => {
  const dbManager = getManager();
  try {
    const stores = await getStores(dbManager);
    response.status(200).json(stores);

    return stores;
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};

export const getStoresyCity = async (request: Request, response: Response) => {
  const dbManager = getManager();
  try {
    const stores = await getStores(dbManager);
    response.status(200).json(stores);

    return stores;
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};
