import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAttendanceService } from "services/attendanceManagement/adminAttendanceService";

const initialState = {
    value: [],
    class: '',
    classList: [],
    monthList: [],
    isLoading: false,
    maxIndex: 20,
    error: false,
    errMsg: ""
};

export const adminManageAttendanceSlice = createSlice({
    name: 'adminManageAttendance',
    initialState,
    reducers: {
        changeClass: (state, action) => {
            state.class = action.payload;
        },
        changeMonth: (state, action) => {
            state.month = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminAttendanceList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminAttendanceList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload;
            })
            .addCase(fetchAdminAttendanceList.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = "Something went wrong!!";
            })
            .addCase(fetchAdminClassList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminClassList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.classList = action.payload;
            })
            .addCase(fetchAdminClassList.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = "Something went wrong!!";
            })

            .addCase(changeAttendStatus.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(changeAttendStatus.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(changeAttendStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = "Something went wrong!!";
            })
    }
})

export const fetchAdminAttendanceList = createAsyncThunk(
    "adminManageAttendance/fetchAdminAttendanceList",
    async (queryInfo) => {
        const { classId, month, year } = queryInfo
        const response = await adminAttendanceService.getAttendanceList(
            classId,
            month,
            year
        );

        if(response.data.data){
            return response.data.data;
        }
        else{
            rejectedWithValue(null)
        }

    }
)

export const fetchAdminClassList = createAsyncThunk(
    "adminManageAttendance/fetchAdminClassList",
    async () => {
        const response = await adminAttendanceService.getClassList();
        if(response.data){
            return response.data;
        }
        else{
            rejectedWithValue(null)
        }
    }
)

export const changeAttendStatus = createAsyncThunk(
    "adminManageAttendance/changeAttendStatus",
    async (queryInfo) => {
        const { traineeId, date, status } = queryInfo
        const response = await adminAttendanceService.changeAttendStatus(
            traineeId,
            date,
            status
        );
        if(response?.success === false){
            rejectedWithValue(null)
        }   

    }
)

export const { changeClass, changeMonth } = adminManageAttendanceSlice.actions;
export default adminManageAttendanceSlice.reducer;