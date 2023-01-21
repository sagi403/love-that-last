import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import productReducer from "./store/productSlice";
import cartReducer from "./store/cartSlice";
import orderReducer from "./store/orderSlice";
import messageReducer from "./store/messageSlice";
import paypalReducer from "./store/paypalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    message: messageReducer,
    paypal: paypalReducer,
  },
});

export default store;
