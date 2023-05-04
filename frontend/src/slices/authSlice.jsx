import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const login = createAsyncThunk("login", async (credentials) => {
  const response = await authService.login(credentials);
  return response.data;
});

export const signup = createAsyncThunk("signup", async (credentials) => {
  const response = await authService.signup(credentials);
  return response.data;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await authService.logout();
  return response.data;
});

const initialState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userDetails = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userDetails = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isAuthenticated = false;
        // state.userDetails = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
