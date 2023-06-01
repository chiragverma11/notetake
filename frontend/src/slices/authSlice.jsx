import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import toast from "react-hot-toast";

var loadingtoast = null;

export const login = createAsyncThunk("login", async (credentials) => {
  const response = await authService.login(credentials);
  return response.data;
});

export const signup = createAsyncThunk(
  "signup",
  async (credentials, { rejectWithValue }) => {
    const response = await authService.signup(credentials);
    return response.data;
  }
);

export const logout = createAsyncThunk("logout", async () => {
  const response = await authService.logout();
  return response.data;
});

export const loadUser = createAsyncThunk("loadUser", async () => {
  const response = await authService.loadUser();
  return response.data;
});

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder //Login Case
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userDetails = action.payload.userDetails;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      }) //Signup Case
      .addCase(signup.pending, (state) => {
        loadingtoast = toast.loading("Signing Up...", {
          id: loadingtoast,
        });
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        toast.success("SignUp Successfully", {
          id: loadingtoast,
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        toast.error("Email Already Exist", {
          id: loadingtoast,
        });
        state.isLoading = false;
        state.error = action.error.message;
      }) //Logout Case
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
      }) //LoadUser Case
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userDetails = action.payload.userDetails;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
