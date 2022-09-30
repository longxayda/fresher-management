import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { traineeAttendanceService } from "services/attendanceManagement/traineeAttendanceService";

const initialState = {
  monthList: {
    startDate:"",
    endDate:"",
  },
  month: "",
  data: [],
  isLoading: false,
  traineeLoading: false,
};

export const traineeManageAttendanceSlice = createSlice({
  name: "traineeManageAttendance",
  initialState,
  reducers: {
    changeMonth: (state, action) => {
      state.month = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraineeAttendanceList.pending, (state, action) => {
        state.traineeLoading = true;
        state.isLoading = true;
      })
      .addCase(fetchTraineeAttendanceList.fulfilled, (state, action) => {
        state.traineeLoading = false;
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTraineeAttendanceList.rejected, (state, action) => {
        state.traineeLoading = false;
        state.isLoading = false;
      })
      .addCase(fetchTraineeMonthList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTraineeMonthList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthList = action.payload;
      })
      .addCase(fetchTraineeMonthList.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const fetchTraineeAttendanceList = createAsyncThunk(
  "traineeManageAttendance/fetchTraineeAttendanceList",
  async (queryInfo) => {
    try{
      const { month, year } = queryInfo
      const response = await traineeAttendanceService.getAttendanceList(
        month, year
      );
      return response.data.data;
    }
    catch(err){
      if (response?.success === false) return response.response.message;
    }
  }
);

export const fetchTraineeMonthList = createAsyncThunk(
  "traineeManageAttendance/fetchTraineeMonthList",
  async () => {
    try{
      const response = await traineeAttendanceService.getMonthList(
      );
      if (response?.success === false) return response.response.message;
      return response.data.data;
    }
    catch(err){
      console.log(err)
    }
  }
);

export const { changeMonth } = traineeManageAttendanceSlice.actions;
export default traineeManageAttendanceSlice.reducer;
