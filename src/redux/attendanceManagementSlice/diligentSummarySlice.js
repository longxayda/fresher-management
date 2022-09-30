import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { diligentSummaryService } from "services/attendanceManagement/diligentSummaryService";

const initialState = {
    data: [],
    isLoading: false,
    maxIndex: 20,
};

export const diligentSummarySlice = createSlice({
    name: 'diligentSummaryTable',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiligentSummaryList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchDiligentSummaryList.fulfilled, (state, action) => {
              state.isLoading = false;
              state.data = action.payload;
      
            })
            .addCase(fetchDiligentSummaryList.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})

export const fetchDiligentSummaryList = createAsyncThunk(
    "diligentSummaryTable/fetchDiligentSummaryList",
    async () => {
        try{
            const response = await diligentSummaryService.getDiligentSummaryList(
            );
            return response.data.data; 
        }
        catch(err){
            if (response?.success === false) {
                return response.response.message;
              }
        }   
    }
)

export default diligentSummarySlice.reducer;