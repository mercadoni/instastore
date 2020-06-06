import { IDestinationDetails, SearchNearestBy } from "types/destinationTypes";

export const initialState: IDestinationDetails = {
  error: null,
  destination: {
    name: "",
    address: "",
    address_two: "",
    description: "",
    country: "",
    city: "",
    zip_code: "",
    state: "",
    latitude: 4.690884099999999,
    longitude: -74.860183,
  },
  filters: {
    searchBy: SearchNearestBy.distance,
    searchOpen: false,
  },
  items: [
    {
      name: "beer",
      quantity: 6,
    },
  ],
};
