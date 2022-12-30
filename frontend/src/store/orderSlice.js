import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: null,
  success: false,
  loading: true,
  loadingDeliver: true,
  loadingPay: true,
  error: null,
  errorOrder: null,
  errorDeliver: null,
  errorPay: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/orders", order, config);

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

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);

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

export const deliverOrder = createAsyncThunk(
  "order/deliverOrder",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.put(`/api/orders/${id}/deliver`);

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

export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ orderId, paymentDetails }, thunkApi) => {
    const {
      id,
      status,
      update_time,
      payer: { email_address },
    } = paymentDetails;

    try {
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, {
        id,
        status,
        update_time,
        email_address,
      });

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, state => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.errorOrder = action.payload;
      })
      .addCase(deliverOrder.pending, state => {
        state.loadingDeliver = true;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loadingDeliver = false;
        state.order = action.payload;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loadingDeliver = false;
        state.errorDeliver = action.payload;
      })
      .addCase(payOrder.pending, state => {
        state.loadingPay = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loadingPay = false;
        state.order = action.payload;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loadingPay = false;
        state.errorPay = action.payload;
      });
  },
});

export const { resetError } = orderSlice.actions;

export default orderSlice.reducer;
