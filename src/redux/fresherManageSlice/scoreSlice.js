import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scoreService } from "services/fresherManagement/scoreService";

const initialState = {
  class: [],
  scoreTable: [],
  isLoading: false,
  month: [],
  pageNumber: 0,
};
export const scoreSlice = createSlice({
  name: "scoreManage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllClass.fulfilled, (state, action) => {
        state.class = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllClass.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getFresherFromClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFresherFromClass.fulfilled, (state, action) => {
        state.scoreTable = action.payload.grades;
        state.isLoading = false;
        state.pageNumber = action.payload.pageNumber;
      })
      .addCase(getFresherFromClass.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getMonthFromClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMonthFromClass.fulfilled, (state, action) => {
        state.month = action.payload.month_list;
        state.isLoading = false;
      })
      .addCase(getMonthFromClass.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getFresherFromClassWithMonth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFresherFromClassWithMonth.fulfilled, (state, action) => {
        state.scoreTable = action.payload.grades;
        state.pageNumber = action.payload.pageNumber;
        state.isLoading = false;
      })
      .addCase(getFresherFromClassWithMonth.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});
export const getAllClass = createAsyncThunk(
  "scoreManage/getAllClass",
  async () => {
    const response = await scoreService.getAllClass();
    if (response?.status != 200) {
      return rejectWithValue(response.response.message);
    }
    return response.data.listResult;
  }
);
export const getFresherFromClass = createAsyncThunk(
  "scoreManage/getFresherFromClass",
  async ([id, pageNumber]) => {
    const response = await scoreService.getFresherFromClass(id, pageNumber);

    if (response?.status != 200) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const getMonthFromClass = createAsyncThunk(
  "scoreManage/getMonthFromClass",
  async ([id]) => {
    const response = await scoreService.getMonthFromClass(id);

    if (response?.status != 200) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const getFresherFromClassWithMonth = createAsyncThunk(
  "scoreManage/getFresherFromClassWithMonth",
  async ([id, month, pageNumber]) => {
    const response = await scoreService.getFresherFromClassWithMonth(
      id,
      month,
      pageNumber
    );
    if (response?.status != 200) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export default scoreSlice.reducer;
