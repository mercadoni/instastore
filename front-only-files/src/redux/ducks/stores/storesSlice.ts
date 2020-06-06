import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, store } from "redux/store";

import { initialState } from "./storesInitialstate";
import { IStore, APIStoreResponse } from "types/storeTypes";
import { IDestination, IDestinationDetails } from "types/destinationTypes";
import { getNearestStore, getStoresInCity } from "api/storeAPI";

export const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    setStoresByCity(state, action: PayloadAction<IStore[]>) {
      state.cityStores = action.payload;
    },
    setStoresNearestTime(state, action: PayloadAction<IStore>) {
      state.nearest.time = action.payload;
    },
    setStoresNearestDistance(state, action: PayloadAction<IStore>) {
      state.nearest.distance = action.payload;
    },
    addStoreToCity(state, action: PayloadAction<IStore>) {
      let stores = state.cityStores || ([] as IStore[]);
      stores.push(action.payload);
    },
    somethingFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      console.info("redux state not modified");
    },
    failingAcknowledgement(state) {
      state.error = null;
    },
  },
});

export const {
  setStoresByCity,
  setStoresNearestTime,
  setStoresNearestDistance,
  addStoreToCity,
  somethingFailed,
  failingAcknowledgement,
} = storesSlice.actions;

export const nearestStore = (destination: IDestination): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    let { filters, items } = getState().destination;

    let destDetails: IDestinationDetails = {
      destination,
      filters,
      items,
      error: null,
    };
    let nearest: APIStoreResponse = await getNearestStore(destDetails);

    dispatch(setStoresNearestDistance(nearest.results[0]));
    dispatch(failingAcknowledgement());
  } catch (err) {
    console.error(`No calls were made ${err}`);
    dispatch(somethingFailed(err));
  }
};

export const storeByCity = (city: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    let stores: APIStoreResponse = await getStoresInCity(city);

    dispatch(setStoresByCity(stores.results));
    dispatch(failingAcknowledgement());
  } catch (err) {
    console.error(`No calls were made ${err}`);
    dispatch(somethingFailed(err));
  }
};

export const selectDestination = (state: RootState) => state.destination;

export default storesSlice.reducer;
