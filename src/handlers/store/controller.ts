import { getManager } from "typeorm";
import { getStores } from "./db";

export const getAllStores = async () => {
  const dbManager = getManager();
  try {
    const stores = await getStores(dbManager);
    return stores;
  } catch (error) {
    throw `There was an error getting the stores: ${error}`;
  }
};
