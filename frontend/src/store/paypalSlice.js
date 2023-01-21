import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingClient: true,
  errorClient: null,
  paypalId: null,
};

export const getPaypalClientId = createAsyncThunk(
  "paypal/getPaypalClientId",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/config/paypal");

      return data;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

const paypalSlice = createSlice({
  name: "paypal",
  initialState,
  reducers: {
    resetStatus: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getPaypalClientId.pending, state => {
        state.loadingClient = true;
      })
      .addCase(getPaypalClientId.fulfilled, (state, action) => {
        state.loadingClient = false;
        state.paypalId = action.payload;
      })
      .addCase(getPaypalClientId.rejected, (state, action) => {
        state.loadingClient = false;
        state.errorClient = action.payload;
      });
  },
});

export const { resetStatus } = paypalSlice.actions;

export default paypalSlice.reducer;
