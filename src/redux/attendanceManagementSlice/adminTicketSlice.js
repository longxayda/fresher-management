import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminTicketService } from "services/attendanceManagement/adminTicketService";

const initialState = {
    value: [],
    class: '',
    classList: [],
    monthList: [],
    ticketLoading: false,
    classLoading: false,
    requestLoading: false,
    requestallLoading: false,
    maxIndex: 20,
    error: false,
    errMsg: ""
};

export const adminTicketSlice = createSlice({
    name: 'adminTicket',
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
            .addCase(fetchAdminTicketList.pending, (state, action) => {
                state.ticketLoading = true;
            })
            .addCase(fetchAdminTicketList.fulfilled, (state, action) => {
                state.ticketLoading = false;
                state.value = action.payload;
            })
            .addCase(fetchAdminTicketList.rejected, (state, action) => {
                state.ticketLoading = false;
                state.errMsg = "Something went wrong!!";
            })

            .addCase(fetchAdminTicketClassList.pending, (state, action) => {
                state.classLoading = true;
            })
            .addCase(fetchAdminTicketClassList.fulfilled, (state, action) => {
                state.classLoading = false;
                state.classList = action.payload;
            })
            .addCase(fetchAdminTicketClassList.rejected, (state, action) => {
                state.classLoading = false;
                state.errMsg = "Something went wrong!!";
            })

            .addCase(handleAdminTicketRequest.pending, (state, action) => {
                state.requestLoading = true;
            })
            .addCase(handleAdminTicketRequest.fulfilled, (state, action) => {
                state.requestLoading = false;
                // state.classList = action.payload;
            })
            .addCase(handleAdminTicketRequest.rejected, (state, action) => {
                state.requestLoading = false;
                state.errMsg = "Something went wrong!!";
            })

            .addCase(handleAdminTicketRequestAll.pending, (state, action) => {
                state.requestLoading = true;
            })
            .addCase(handleAdminTicketRequestAll.fulfilled, (state, action) => {
                state.requestLoading = false;
            })
            .addCase(handleAdminTicketRequestAll.rejected, (state, action) => {
                state.requestLoading = false;
                state.errMsg = "Something went wrong!!";
            })
    }
})

export const fetchAdminTicketList = createAsyncThunk(
    "adminTicket/fetchAdminTicketList",
    async (queryInfo) => {
        const { classId, month, year } = queryInfo;
        const response = await adminTicketService.getTicketList(
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

export const fetchAdminTicketClassList = createAsyncThunk(
    "adminTicket/fetchAdminTicketClassList",
    async () => {
        const response = await adminTicketService.getClassList();
        if(response.data){
            return response.data;
        }
        else{
            rejectedWithValue(null)
        }
    }
)

export const handleAdminTicketRequest = createAsyncThunk(
    "adminTicket/handleAdminTicketRequest",
    async (queryInfo) => {
        const { object } = queryInfo;
        const response = await adminTicketService.handleTicketRequest(object);
        if(response?.success === false){
            rejectedWithValue(null)
        }   
    }
)

export const handleAdminTicketRequestAll = createAsyncThunk(
    "adminTicket/handleAdminTicketRequestAll",
    async (queryInfo) => {
        const { object } = queryInfo;
        const response = await adminTicketService.handleTicketRequestAll(object);
        if(response?.success === false){
            rejectedWithValue(null)
        }   
    }
)

export const { changeClass, changeMonth } = adminTicketSlice.actions;
export default adminTicketSlice.reducer;