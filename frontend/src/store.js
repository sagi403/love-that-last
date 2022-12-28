import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import productReducer from "./store/productSlice";
import cartReducer from "./store/cartSlice";
import orderReducer from "./store/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
