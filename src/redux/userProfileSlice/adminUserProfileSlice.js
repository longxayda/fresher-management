import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminUserProfileService } from "services/userProfileManagement/adminUserProfileService";

const initialState = {
  value: {},
  data:[],
  isLoading: false,
};

export const adminUserProfileSlice = createSlice({
  name: "adminUserProfile",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAdminUserProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetAdminUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGetAdminUserProfile.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateAdminUserProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateAdminUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchUpdateAdminUserProfile.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const fetchGetAdminUserProfile = createAsyncThunk(
  "adminUserProfile/fetchGetAdminUserProfile",
  async () => {
    try{

      const response = await adminUserProfileService.getAdminUserProfile();

      return response.data.data;
    }
    catch(err){
      rejectWithValue(response.response.message)

    }
  }
);

export const fetchUpdateAdminUserProfile = createAsyncThunk(
  "adminUserProfile/fetchUpdateAdminUserProfile",
  async (queryInfo) => {
    try{
      const {body} = queryInfo
      const response = await adminUserProfileService.updateAdminUserProfile(body);
      return response.data.data;
    }
    catch(err){
      rejectWithValue(response.response.message)
    }
  }
);

export default adminUserProfileSlice.reducer;
