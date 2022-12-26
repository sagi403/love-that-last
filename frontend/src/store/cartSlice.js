import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: sessionStorage.getItem("shippingAddress")
    ? JSON.parse(sessionStorage.getItem("shippingAddress"))
    : [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.cartItems.find(item => item.id === newItem.id);

      if (existItem) {
        state.cartItems = state.cartItems.map(item =>
          item.id === existItem.id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      sessionStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
  },
});

export const { resetError, addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
