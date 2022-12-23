import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import productReducer from "./store/productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;
