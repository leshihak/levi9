import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  }
});
