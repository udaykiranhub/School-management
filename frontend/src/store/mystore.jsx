import { configureStore } from "@reduxjs/toolkit";
import reducer from "./userslice";

export const store = configureStore({
  reducer: {
    user: reducer,
  },
});
