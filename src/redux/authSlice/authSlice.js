import { createSlice } from "@reduxjs/toolkit";
import { authServices } from "services/UserListServices/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "services/api";
import { startTransition } from "react";


const user = localStorage.getItem("user");

export const login = createAsyncThunk(
  "login",
  async ({ username, password }, { rejectWithValue }) => {
    const res = await authServices.login({
      username: username,
      password: password,
    });
    if (res.success == false) {
      return rejectWithValue(res);
    }
    return res.data.data;
  }
);

export const logout = createAsyncThunk("logout", async () => {
  return "abcs";
});

const initialState = {
  isLoggedIn: user ? true : false,
  isLoading: false,
  message: "",
  user: user ? user : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.user ? api.addCache("user", state.user) : {};
      state.user ? api.addCache("token", state.user.access_token) : {};
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.response.message;
    },
    [logout.fulfilled]: (state, action) => {
      api.removeCache("user");
      api.removeCache("token");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
