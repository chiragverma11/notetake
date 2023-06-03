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
    try {
      const response = await authService.signup(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
        state.isLoading = true;
        state.error = null;
        loadingtoast = toast.loading("Signing Up...", {
          id: loadingtoast,
        });
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Signup Successfully", {
          id: loadingtoast,
        });
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(state.error, {
          id: loadingtoast,
        });
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
      }) //Forgot Password Case
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Reset Email Sent", {
          id: loadingtoast,
        });
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(state.error, {
          id: loadingtoast,
        });
      }) //Reset Password Case
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        toast.success(action.payload.message, {
          id: loadingtoast,
        });
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
        toast.error(state.error, {
          id: loadingtoast,
        });
      });
  },
});

export default authSlice.reducer;
