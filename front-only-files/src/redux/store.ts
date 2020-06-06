import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import destinationReducer from "./ducks/destination/destinationSlice";
import storesReducer from "./ducks/stores/storesSlice";

export const store = configureStore({
  reducer: {
    user: destinationReducer,
    destination: destinationReducer,
    stores: storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
