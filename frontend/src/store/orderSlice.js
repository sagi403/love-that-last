import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: null,
  orders: null,
  ordersAll: null,
  success: false,
  loading: true,
  loadingOrders: true,
  loadingDeliver: true,
  loadingPay: true,
  error: null,
  errorOrder: null,
  errorOrders: null,
  errorDeliver: null,
  errorPay: null,
  page: null,
  pages: null,
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
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        { id, status, update_time, email_address },
        config
      );

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

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (page = 1, thunkApi) => {
    try {
      const { data } = await axios.get(
        `/api/orders/myorders?pageNumber=${page}`
      );

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

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (page = 1, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/orders?pageNumber=${page}`);

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
    resetStatus: state => {
      state.error = null;
      state.errorOrder = null;
      state.errorOrders = null;
      state.errorDeliver = null;
      state.errorPay = null;
      state.success = false;
    },
    resetAllOrders: () => initialState,
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
      })
      .addCase(getUserOrders.pending, state => {
        state.loadingOrders = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orders = action.payload.orders;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        state.errorOrders = action.payload;
      })
      .addCase(getAllOrders.pending, state => {
        state.loadingOrders = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.ordersAll = action.payload.orders;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loadingOrders = false;
        state.errorOrders = action.payload;
      });
  },
});

export const { resetStatus, resetAllOrders } = orderSlice.actions;

export default orderSlice.reducer;
