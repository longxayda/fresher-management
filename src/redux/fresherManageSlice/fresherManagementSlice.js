import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fresherService } from "services/fresherManagement/fresherService";
import { storage } from "services/storage";

const initialState = {
  value: [],
  isLoading: false,
  loading: "idle", // idle | pending | success |  fail
  error: null,
  maxIndex: 1,
  fetchError: {
    error: false,
    message: "",
  },
  isAPISubribed: false,
};
export const manageFRSlice = createSlice({
  name: "manageFR",
  initialState,
  reducers: {
    APIUnsubribed(state) {
      state.isAPISubribed = false;
    },
    APISubribed(state) {
      state.isAPISubribed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFresher.pending, (state, action) => {
        state.isLoading = true;
        state.isAPISubribed = true;
        state.value = [];
      })
      .addCase(fetchFresher.fulfilled, (state, action) => {
        if (state.isAPISubribed) {
          state.isAPISubribed = false;
          if (action.payload.error) {
            state.isLoading = false;
            state.maxIndex = 1;
            state.value = [];
            state.fetchError = {
              error: true,
              message: action.payload.probMessage,
            };
          } else {
            state.isLoading = false;
            state.maxIndex = action.payload.totalPage;
            state.value = action.payload.trainees;
            state.fetchError = {
              error: false,
              message: "",
            };
          }
        }
      })
      .addCase(fetchFresher.rejected, (state, action) => {
        if (state.isAPISubribed) {
          state.isAPISubribed = false;
          state.value = [];
          state.isLoading = false;
        }
      })
      .addCase(addFresher.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(addFresher.fulfilled, (state, action) => {
        state.loading = "success";
        state.value.push(action.payload);
      })
      .addCase(addFresher.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      })
      .addCase(updateFresher.fulfilled, (state, action) => {
        const index = state.value.findIndex(
          (item) => item.userId === action.payload.data.userId
        );
        state.value[index] = action.payload.data;
        state.value[index].className = action.payload.classCode;

        state.loading = "success";
      })
      .addCase(updateFresher.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(updateFresher.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      })
      .addCase(importFreshers.fulfilled, (state, action) => {
        state.loading = "success";
      })
      .addCase(deleteOneFresher.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(deleteOneFresher.fulfilled, (state, action) => {
        state.loading = "success";
        const index = state.value.findIndex(
          (item) => item.userId === action.payload
        );
        state.value.splice(index, 1);
      })
      .addCase(deleteManyFresher.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(deleteManyFresher.fulfilled, (state, action) => {
        state.loading = "success";
        state.value = state.value.filter(
          (item) => !action.payload.includes(item.userId)
        );
      });
  },
});

export const fetchFresher = createAsyncThunk(
  "manageFR/fetchFresher",
  async (queryInfo) => {
    const { pageNum, pageSize, params } = queryInfo;
    try {
      const response = await fresherService.getAllFresher(
        pageNum - 1,
        pageSize,
        params
      );

      if (response?.success === false) {
        return {
          totalPage: 1,
          trainees: [],
          error: true,
          probMessage: response.response.message,
        };
      }
      return response.data.data;
    } catch (error) {
      return {
        totalPage: 1,
        trainees: [],
        error: true,
        probMessage: error.message,
      };
    }
  }
);
export const addFresher = createAsyncThunk(
  "manageFR/addFresher",
  async (fresherData, { rejectWithValue }) => {
    try {
      let adminId = storage.getCache("user").id;
      console.log(adminId);
      const response = await fresherService.createFresher(fresherData, adminId);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateFresher = createAsyncThunk(
  "manageFR/updateFresher",
  async (payload) => {
    const response = await fresherService.updateFresher(
      payload.data,
      payload.id
    );
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }

    return { data: response.data.data, classCode: payload.data.classCode };
  }
);
export const importFreshers = createAsyncThunk(
  "manageFR/importFreshers",
  async (payload) => {
    const response = await fresherService.importFreshers(
      payload.adminID,
      payload.formData
    );
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const deleteOneFresher = createAsyncThunk(
  "manageFR/deleteOneFresher",
  async (id) => {
    try {
      const response = await fresherService.deleteOneFresher(id);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteManyFresher = createAsyncThunk(
  "manageFR/deleteManyFresher",
  async (ids) => {
    try {
      const response = await fresherService.deleteManyFresher(ids);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return ids;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllClassInYear = createAsyncThunk(
  "manageFR/getAllClassInYear",
  async (year) => {
    try {
      const response = await fresherService.getAllClassInYear(year);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const { APIUnsubribed, APISubribed } = manageFRSlice.actions;
export default manageFRSlice.reducer;
