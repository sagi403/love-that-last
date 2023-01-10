import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactUsMessage: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    contactUsAnswer: state => {
      state.contactUsMessage = true;
    },
    resetStatus: () => initialState,
  },
});

export const { contactUsAnswer, resetStatus } = messageSlice.actions;

export default messageSlice.reducer;
