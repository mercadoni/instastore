import { EntityManager } from "typeorm";
import { Store } from "../../entities/Store";

export const getStores = async (manager: EntityManager): Promise<Store[]> => {
  return manager.find(Store);
};
