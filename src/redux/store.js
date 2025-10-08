import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import coursesReducer from "./slices/coursesSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
    courses: coursesReducer,
  },
});

export default store;
