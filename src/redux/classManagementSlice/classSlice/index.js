import { createSlice } from "@reduxjs/toolkit";
import { classServices } from "services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListClass = createAsyncThunk(
  "class/getListClass",
  async ({ page, limit }) => {
    const res = await classServices.getListClass({ page, limit });
    if (res.data) {
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const createClass = createAsyncThunk(
  "class/createClass",
  async (body) => {
    const res = await classServices.createClass(body);
    if (res.data) {
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const getListAdmin = createAsyncThunk(
  "class/getListAdmin",
  async ({ page, limit }) => {
    const res = await classServices.getListAdmin({ page, limit });
    return res.data;
  }
);

export const getListSkill = createAsyncThunk("class/getListSkill", async () => {
  const res = await classServices.getListSkill();
  return res.data;
});

const initialState = {
  listClass: {
    page: 0,
    totalPage: 1,
    listResult: [],
  },
  listSkill: [],
  isLoading: false,
  listAdmin: [],
  isError: false,
  isSuccess: undefined,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    resetError: (state) => {
      state.isError = false;
      state.isSuccess = undefined;
    },
  },
  extraReducers: {
    [getListClass.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [getListClass.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.listClass = action.payload;
    },
    [getListClass.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },
    [createClass.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = undefined;
    },
    [createClass.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [createClass.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
    [getListSkill.fulfilled]: (state, action) => {
      state.listSkill = action.payload;
    },
    [getListAdmin.fulfilled]: (state, action) => {
      state.listAdmin = action.payload;
    },
  },
});

export const { resetError } = classSlice.actions;

export default classSlice.reducer;
