import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetAllCart } from "./cartSlice";
import { resetAllOrders } from "./orderSlice";
import { resetAllProducts } from "./productSlice";

const initialState = {
  loading: false,
  loadingAutoLogin: false,
  loadingUpdates: false,
  loadingUsers: false,
  loadingUserDetails: false,
  loadingAuthResetPassword: true,
  loadingResetPassword: false,
  loggedIn: false,
  error: null,
  errorUpdateUser: null,
  errorDeleting: null,
  errorForgotPassword: null,
  errorAuthResetPassword: null,
  errorResetPassword: null,
  userInfo: null,
  users: null,
  page: null,
  pages: null,
  userDetails: null,
  success: false,
  successUpdateUser: false,
  successDeletingUser: false,
  successForgotPasswordLink: false,
  successAuthResetPassword: false,
  successResetPassword: false,
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

export const usersList = createAsyncThunk(
  "user/usersList",
  async (page = 1, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/users?pageNumber=${page}`);

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

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);

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

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({ id, name, email, isAdmin }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, email, isAdmin },
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);

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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/users/forgot-password`,
        { email },
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

export const authResetPassword = createAsyncThunk(
  "user/authResetPassword",
  async ({ id, token }, thunkApi) => {
    try {
      const { data } = await axios.get(
        `/api/users/reset-password/${id}/${token}`
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

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ id, token, password }, thunkApi) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/users/reset-password/${id}/${token}`,
        { password },
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: state => {
      state.error = null;
      state.errorUpdateUser = null;
      state.errorDeleting = null;
      state.errorForgotPassword = null;
      state.errorAuthResetPassword = null;
      state.success = false;
      state.successUpdateUser = false;
      state.successDeletingUser = false;
      state.successForgotPasswordLink = false;
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
        state.loadingUpdates = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loadingUpdates = false;
        state.error = action.payload;
      })
      .addCase(usersList.pending, state => {
        state.loadingUsers = true;
      })
      .addCase(usersList.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload.users;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(usersList.rejected, (state, action) => {
        state.loadingUsers = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, state => {
        state.loadingUserDetails = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loadingUserDetails = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.error = action.payload;
      })
      .addCase(updateUserDetails.pending, state => {
        state.loadingUserDetails = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loadingUserDetails = false;
        state.successUpdateUser = true;
        state.userDetails = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loadingUserDetails = false;
        state.errorUpdateUser = action.payload;
      })
      .addCase(deleteUser.pending, () => {})
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.successDeletingUser = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.errorDeleting = action.payload;
      })
      .addCase(forgotPassword.pending, () => {})
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.successForgotPasswordLink = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.errorForgotPassword = action.payload;
      })
      .addCase(authResetPassword.pending, state => {
        state.loadingAuthResetPassword = true;
      })
      .addCase(authResetPassword.fulfilled, state => {
        state.successAuthResetPassword = true;
        state.loadingAuthResetPassword = false;
      })
      .addCase(authResetPassword.rejected, (state, action) => {
        state.loadingAuthResetPassword = false;
        state.errorAuthResetPassword = action.payload;
      })
      .addCase(resetPassword.pending, state => {
        state.loadingResetPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.successResetPassword = action.payload;
        state.loadingResetPassword = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loadingResetPassword = false;
        state.errorResetPassword = action.payload;
      });
  },
});

export const { resetStatus, resetAllUser } = userSlice.actions;

export default userSlice.reducer;
