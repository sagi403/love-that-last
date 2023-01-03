import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingProduct: true,
  loadingProducts: true,
  loadingReview: true,
  product: null,
  error: null,
  errorProductReview: null,
  successProductReview: null,
  products: null,
};

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);

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

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/products");

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

export const createReview = createAsyncThunk(
  "product/createReview",
  async ({ id, rating, comment }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        config
      );

      return data.message;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetStatus: state => {
      state.error = null;
      state.errorProductReview = null;
      state.successProductReview = null;
    },
    resetAllProducts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getProductById.pending, state => {
        state.loadingProduct = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, state => {
        state.loadingProducts = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, state => {
        state.loadingReview = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.successProductReview = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorProductReview = action.payload;
      });
  },
});

export const { resetStatus, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
