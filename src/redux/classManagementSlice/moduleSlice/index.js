import { createSlice } from "@reduxjs/toolkit";
import { moduleServices } from "services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListModule = createAsyncThunk(
  "class/getListModule",
  async ({page, limit}) => {
    const res = await moduleServices.getListModule({page, limit});
    if(res.data){
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const createModule = createAsyncThunk(
  "class/createModule",
  async (body) => {
    const res = await moduleServices.createModule(body);
    if(res.data){
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const deleteModule = createAsyncThunk(
  "class/deleteModule",
  async (id) => {
    const res = await moduleServices.deleteModule(id);
    return res.data;
  }
);

const initialState = {
  listModule: {
    page: 1,
    limit: 1,
    data: [],
  },
  isLoading: false,
  isErrorModule: false,
  isSuccessModule: undefined,
};

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    resetModule: (state) => {
      state.isErrorModule = false;
      state.isSuccessModule = undefined;
    },
  },
  extraReducers: {
    [getListModule.pending]: (state, action) => {
      state.isLoading = true;
      state.isErrorModule = false;
    },
    [getListModule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isErrorModule = false;
      state.listModule = action.payload;
    },
    [getListModule.rejected] : (state, action) => {
      state.isErrorModule = true;
      state.isLoading = false;
    },
    [createModule.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccessModule = undefined;
    },
    [createModule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccessModule = true;
    },
    [createModule.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccessModule = false;
    },
  },
});

export const { resetModule } = moduleSlice.actions;

export default moduleSlice.reducer;
