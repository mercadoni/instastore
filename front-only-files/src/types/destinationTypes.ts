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

export interface IOrderItem {
  name: string;
  quantity: number;
}
export enum SearchNearestBy {
  distance,
  time,
}
export interface IFilter {
  searchBy: SearchNearestBy;
  searchOpen: boolean;
}
export interface IDestinationDetails {
  destination: IDestination;
  items?: Array<IOrderItem>;
  filters: IFilter;
  error: Error | null;
}
export interface APIDestinationResponse {
  results: IDestination;
  info: string;
  error: string;
}
