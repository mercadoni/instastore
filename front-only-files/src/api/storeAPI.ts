import axios, { AxiosRequestConfig } from "axios";

import { IStore, APIStoreResponse } from "types/storeTypes";
import { IDestinationDetails } from "types/destinationTypes";

const serviceEndpoint = process.env.REACT_APP_API_URL as string;
const storesURI = process.env.REACT_APP_API_STORES_URI as string;

export async function getNearestStore(destination: IDestinationDetails) {
  const endpoint = "/nearest";
  const url = `${serviceEndpoint}${storesURI}${endpoint}`;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      searchBy: destination.filters.searchBy,
      hi: true,
    },
  };
  const data: IDestinationDetails = destination;
  let response = await axios.post<APIStoreResponse>(url, data, config);
  console.log(`Nearest post from axios: ", ${(await response).data}`);
  return (await response).data;
}

export async function getStoresInCity(city: string) {
  const url = `${serviceEndpoint}${storesURI}/city/${city}`;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await axios.get<APIStoreResponse>(url, config);
  console.log(`get from axios: ", ${(await response).data}`);
  return (await response).data;
}
