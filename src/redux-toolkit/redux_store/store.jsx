import { configureStore } from "@reduxjs/toolkit";
import accountCreationApiReducer from "../reducer/accountCreationApiReducer";
export const store = configureStore({
  reducer: {
     accountCreationApiReducer: accountCreationApiReducer
  },
});
