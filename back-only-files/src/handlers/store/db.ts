import { EntityManager } from "typeorm";
import { Store } from "../../entities/Store";

export const getStores = async (manager: EntityManager): Promise<Store[]> => {
  return manager.find(Store);
};

export const findStoresInCity = async (
  manager: EntityManager,
  city: string
): Promise<Store[]> => {
  return manager.getRepository(Store).find({ city: city });
};
export const findStoresInstate = async (
  manager: EntityManager,
  state: string
): Promise<Store[]> => {
  return manager.getRepository(Store).find({ state: state });
};
