import { createSlice } from "@reduxjs/toolkit";
import { syllabusServices } from "services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  listSyllabus: [],
  isLoading: false,
};

export const getListSyllabus = createAsyncThunk(
  "syllabus/getListSyllabus",
  async (id) => {
    const res = await syllabusServices.getListSyllabus(id);
    return res.data.syllabus;
  }
);

export const createSyllabus = createAsyncThunk(
  "syllabus/createSyllabus",
  async ([id,body]) => {
    const res = await syllabusServices.createSyllabus(id,body);
    if(res.data){
      const data = await  syllabusServices.getListSyllabus(id);
      return data.data.syllabus;
    }
    return [];
  }
);


export const deleteSyllabus = createAsyncThunk(
  "syllabus/deleteSyllabus",
  async ([id,topicid]) => {
    const res = await syllabusServices.deleteSyllabus(id);
    const data = await syllabusServices.getListSyllabus(topicid);
    return data.data.syllabus;
  }
);



export const syllabusSlice = createSlice({
  name: "syllabus",
  initialState,
  reducers: {},
  extraReducers: {
    [getListSyllabus.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getListSyllabus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listSyllabus = action.payload;
    },
    [createSyllabus.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createSyllabus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listSyllabus = action.payload;
    },
    [deleteSyllabus.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteSyllabus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.listSyllabus = action.payload;
    },
  },
});

export const {} = syllabusSlice.actions;

export default syllabusSlice.reducer;
