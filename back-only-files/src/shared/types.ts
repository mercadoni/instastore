export interface Route {
  path: string;
  method: string;
  action: any;
}

export interface IDestination {
  name: string;
  address: string;
  address_two: string;
  description: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface ICityPoint {
  city: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

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
