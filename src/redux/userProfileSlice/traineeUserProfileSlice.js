import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { traineeUserProfileService } from "services/userProfileManagement/traineeUserProfileService";

const initialState = {
    value: [],
    isLoading: false,
    maxIndex: 20,
    errMsg: "",
};

export const traineeUserProfile = createSlice({
    name: 'traineeUserProfile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(submitFeedbacks.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(submitFeedbacks.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.value = action.payload;
        })
        .addCase(submitFeedbacks.rejected, (state, action) => {
            state.isLoading = false;
            state.errMsg = "Something went wrong!!";
        })
            
    }
})

export const submitFeedbacks = createAsyncThunk(
    "traineeUserProfile/submitFeedbacks",
    async (feedbackItems) => {
        // const {feedbackItems} = queryInfo
        const response = await traineeUserProfileService.submitFeedbacks(feedbackItems);
        if(response?.success === false){
            rejectedWithValue(null)
        }   
        
    }
)

export const {  } = traineeUserProfile.actions;
export default traineeUserProfile.reducer;