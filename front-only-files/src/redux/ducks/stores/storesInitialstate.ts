import { IStore, ISToreState } from "types/storeTypes";

export const initialState: ISToreState = {
  error: null,
  cityStores: [
    // {
    //   id: 25,
    //   name: "the house",
    //   is_open: true,
    //   latitude: 4.5995892,
    //   longitude: -74.084578999999,
    //   nextDeliveryTime: 60,
    //   address: "hello avenue",
    //   city: "Bogota",
    //   country: "Colombia",
    //   state: "Bogota",
    // },
  ],
  nearest: {
    distance: undefined,
    // {
    //   id: 25,
    //   name: "the house",
    //   is_open: true,
    //   latitude: 4.590884099999999,
    //   longitude: -74.1160183,
    //   nextDeliveryTime: 60,
    //   address: "hello avenue",
    //   city: "Bogota",
    //   country: "Colombia",
    //   state: "Bogota",
    // },
    time: undefined,
  },
};
