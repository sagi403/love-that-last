import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetAllCart } from "./cartSlice";
import { resetAllOrders } from "./orderSlice";
import { resetAllProducts } from "./productSlice";

const initialState = {
  loading: false,
  loadingAutoLogin: false,
  loadingUpdates: false,
  loggedIn: false,
  error: null,
  userInfo: null,
  success: false,
};

export const login = createAsyncThunk("user/login", async (user, thunkApi) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/users/login", user, config);

    return data.success;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    return thunkApi.rejectWithValue(err);
  }
});

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/users/register", user, config);

      return data.success;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "user/autoLogin",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/users/profile");

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(false);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    sessionStorage.removeItem("shippingAddress");
    sessionStorage.removeItem("paymentMethod");

    await axios.post("/api/users/logout");

    thunkApi.dispatch(resetAllCart());
    thunkApi.dispatch(resetAllOrders());
    thunkApi.dispatch(resetAllProducts());
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    return thunkApi.rejectWithValue(err);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.patch("/api/users/profile", user, config);

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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: state => {
      state.error = null;
      state.success = false;
    },
    resetAllUser: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(autoLogin.pending, state => {
        state.loadingAutoLogin = true;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.loadingAutoLogin = false;
        state.userInfo = action.payload;
        state.loggedIn = true;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.loadingAutoLogin = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, state => {
        state.loadingUpdates = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loadingUpdates = true;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loadingUpdates = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, resetAllUser } = userSlice.actions;

export default userSlice.reducer;
