export interface IStore {
  id: number;
  name: string;
  is_open: true;
  latitude: number;
  longitude: number;
  nextDeliveryTime: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface APIStoreResponse {
  results: IStore[];
  info: string;
  error: string;
}

export interface ISToreState {
  error: null | Error;
  cityStores: IStore[] | undefined;
  nearest: {
    distance: IStore | undefined;
    time: IStore | undefined;
  };
}
