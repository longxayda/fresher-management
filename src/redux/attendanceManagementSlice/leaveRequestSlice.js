import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leaveRequestService } from "services/attendanceManagement/leaveRequestService";

const initialState = {
    value: [],
    ticket: {},
    isLoading: false,
    maxIndex: 20,
};

export const leaveRequestSlice = createSlice({
    name: 'leaveRequest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaveRequest.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchLeaveRequest.fulfilled, (state, action) => {
              state.isLoading = false;
              state.value = action.payload;

            })
    }
})

export const fetchLeaveRequest = createAsyncThunk(
    "leaveRequest/fetchLeaveRequest",
    async (queryInfo) => {
        const {traineeId} = queryInfo;
        const response = await leaveRequestService.getLeaveRequest(
            traineeId
        );
        if (response?.success === false) {
          return response.response.message;
        }
        return response.data.data;
    }
)

export const fetchNewRequest = createAsyncThunk(
    "leaveRequest/addNewRequest",
    async (queryInfo) => {
        const {object} = queryInfo;
        const response = await leaveRequestService.addRequest(
            object
        );
        if (response?.success === false) {
          return response.response.message;
        }
        return response.data.data;
    }
)

export const addRequest = createAsyncThunk(
    "leaveRequest/addRequest",
    async (body, thunkAPI) => {
      try {
        const res = await leaveRequestService.addRequest({
          partial: body.partial,
          startDate: body.startDate,
          endDate: body.endDate,
          reason: body.reason
        });

        res.data.type = "add";
        thunkAPI.dispatch(getLeaveRequest(res.data));
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  );

export default leaveRequestSlice.reducer;