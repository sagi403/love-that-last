import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingProduct: true,
  loadingProducts: true,
  loadingReview: true,
  loadingUpload: false,
  product: null,
  productId: null,
  productImage: null,
  error: null,
  errorProductReview: null,
  errorUpload: null,
  successProductReview: null,
  successCreateProduct: false,
  successUpdateProduct: false,
  successDeleteProduct: false,
  products: null,
  page: null,
  pages: null,
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
  async ({ page = 1, keyword = "", sortOrder = "" }, thunkApi) => {
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${page}&keyword=${keyword}&sortOrder=${sortOrder}`
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

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.post(`/api/products`);

      return data.id;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateProductDetails = createAsyncThunk(
  "product/updateProductDetails",
  async (input, thunkApi) => {
    const {
      id,
      name,
      price,
      beforeSalePrice,
      image,
      brand,
      category,
      countInStock,
      description,
      longDescription,
    } = input;
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const { data } = await axios.put(
        `/api/products/${id}`,
        {
          name,
          price,
          beforeSalePrice,
          image,
          brand,
          category,
          countInStock,
          description,
          longDescription,
        },
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);

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

export const uploadImage = createAsyncThunk(
  "product/uploadImage",
  async (file, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`/api/upload`, file, config);

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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetStatus: state => {
      state.error = null;
      state.errorProductReview = null;
      state.errorUpload = null;
      state.successProductReview = null;
      state.successCreateProduct = false;
      state.successUpdateProduct = false;
      state.successDeleteProduct = false;
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
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
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
      })
      .addCase(createProduct.pending, state => {
        state.loadingProduct = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.productId = action.payload;
        state.successCreateProduct = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })
      .addCase(updateProductDetails.pending, state => {
        state.loadingProduct = true;
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.successUpdateProduct = true;
      })
      .addCase(updateProductDetails.rejected, (state, action) => {
        state.loadingProduct = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, state => {
        state.loadingProducts = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.successDeleteProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.payload;
      })
      .addCase(uploadImage.pending, state => {
        state.loadingUpload = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loadingUpload = false;
        state.productImage = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loadingUpload = false;
        state.errorUpload = action.payload;
      });
  },
});

export const { resetStatus, resetAllProducts } = productSlice.actions;

export default productSlice.reducer;
