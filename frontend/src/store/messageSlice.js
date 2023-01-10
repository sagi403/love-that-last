import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageSent: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageReceive: state => {
      state.messageSent = true;
    },
    resetStatus: () => initialState,
  },
});

export const { messageReceive, resetStatus } = messageSlice.actions;

export default messageSlice.reducer;
