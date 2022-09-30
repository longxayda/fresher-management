import { createSlice } from "@reduxjs/toolkit";
import { classDetailsServices } from "services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrMessage } from "../learningPathSlice";

export const getClassDetails = createAsyncThunk(
  "class/getClassDetails",
  async (id) => {
    const res = await classDetailsServices.getClassDetails(id);
    if (res.data) {
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const getMentorList = createAsyncThunk(
  "class/getMentorList",
  async () => {
    const res = await classDetailsServices.getMentorList();
    if (res.data) {
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const getTrainerList = createAsyncThunk(
  "class/getTrainerList",
  async () => {
    const res = await classDetailsServices.getTrainerList();
    if (res.data) {
      return res.data;
    } else {
      rejectWithValue(null);
    }
  }
);

export const updateClassDetails = createAsyncThunk(
  "class/updateClassDetails",
  async ([id, body]) => {
    const res = await classDetailsServices.updateClassDetails(id, body);
    if(res.status === 200) {
      const data = await classDetailsServices.getClassDetails(id);
      return data.data;
    }
    else rejectWithValue(null);
  }
);

const initialState = {
  classDetails: {},
  mentorList: [],
  trainerList: [],
  isLoading: false,
  success: null,
  err: null
};

export const classDetailsSlice = createSlice({
  name: "class-details",
  initialState,
  reducers: {
    setSuccess(state) {
      state.success = null;
    },
    setErr(state) {
      state.err = null;
    }
  },
  extraReducers: {
    [getClassDetails.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getClassDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classDetails = action.payload;
    },
    [getClassDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = "Can not get this class details";
    },
    [getMentorList.fulfilled]: (state, action) => {
      state.mentorList = action.payload;
    },
    [getTrainerList.fulfilled]: (state, action) => {
      state.trainerList = action.payload;
    },
    [updateClassDetails.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateClassDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classDetails = action.payload;
      state.success = "Successfully updated class details";
    },
    [updateClassDetails.rejected] : (state, action) => {
      state.isLoading = false;
      state.err = "Update class details failed";
    },
  },
});

export const {setSuccess, setErr} = classDetailsSlice.actions;

export default classDetailsSlice.reducer;

