import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "redux/store";
import { IDestination, IFilter, IOrderItem } from "types/destinationTypes";

import { initialState } from "./destinationInitialstate";

export const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<IDestination>) => {
      state.destination = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilter>) => {
      state.filters = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addItemToOrder: (state, action: PayloadAction<IOrderItem>) => {
      let items = state.items || [];
      let alreadyThere = items.findIndex(
        (elem) => elem.name === action.payload.name
      );
      state.items =
        alreadyThere >= 0
          ? [
              ...items.slice(0, alreadyThere),
              action.payload,
              ...items.slice(alreadyThere),
            ]
          : [...items, action.payload];
    },
    deleteItemFromOrder: (state, action: PayloadAction<IOrderItem>) => {
      let items = state.items || [];
      let alreadyThere = items.findIndex(
        (elem) => elem.name === action.payload.name
      );
      state.items =
        alreadyThere >= 0
          ? [...items.slice(0, alreadyThere), ...items.slice(alreadyThere + 1)]
          : state.items;
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
  setDestination,
  setFilters,
  addItemToOrder,
  deleteItemFromOrder,
  somethingFailed,
  failingAcknowledgement,
} = destinationSlice.actions;

export const sentDestinationToApi = (destination: IDestination): AppThunk => (
  dispatch
) => {
  try {
    dispatch(setDestination(destination));
    dispatch(failingAcknowledgement());
  } catch (err) {
    console.error(`No calls were made ${err}`);
    dispatch(somethingFailed(err));
  }
};

export const selectDestination = (state: RootState) => state.destination;

export default destinationSlice.reducer;
