import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attendanceService } from "services/attendanceManagement/attendanceService";

const initialState = {
    message: '',
    isLoading: false,
    status: '',
};

export const postAttendance = createAsyncThunk(
    "attendance/postAttendance",
    async ({username, password}) => {
        const response = await attendanceService.postAttendance({
            "username" :username,
            "password" :password
        });
        if (response?.success === false) {
            console.log(response.response.message)
            throw response.response.message;
        }
        return response.data.data;  
    }
)

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postAttendance.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(postAttendance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload;      
            })
            .addCase(postAttendance.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.error.message
            })
    }
})

export const {} = attendanceSlice.actions;
export default attendanceSlice.reducer;