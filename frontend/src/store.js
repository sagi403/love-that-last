import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import productReducer from "./store/productSlice";
import cartReducer from "./store/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
