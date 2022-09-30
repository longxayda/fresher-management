import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "react-test-renderer";
import { topicService } from "services/fresherManagement/topicService";

const initialState = {
  moduleTable: [],
  detailTraineeMark: {},
  score: {},
  isLoading: false,
  isLoadingModal: false,
  isLoadingModule: false,
  moduleById: {},
  updateSuccess: false,
  isLoadingUpdate:false,
  errorUpdate:""
};
export const topicMarkSlice = createSlice({
  name: "topicMarkManage",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = { ...state.score, ...action.payload };
    },
    clearScore: (state) => {
      state.score = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // get module table reducers
      .addCase(getModuleFromClass.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getModuleFromClass.fulfilled, (state, action) => {
        state.moduleTable = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getModuleFromClass.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllDetailTraineeMark.pending, (state, action) => {
        state.isLoadingModal = true;
      })
      .addCase(getAllDetailTraineeMark.fulfilled, (state, action) => {
        state.detailTraineeMark = action.payload;
        state.isLoadingModal = false;
      })
      .addCase(getModuleMarkOfAll.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getModuleMarkOfAll.fulfilled, (state, action) => {
        state.markTable = action.payload;
        state.isLoading = false;
      })
      .addCase(getModuleMarkOfAll.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getModuleById.pending, (state, action) => {
        state.isLoadingModule = true;
      })
      .addCase(getModuleById.fulfilled, (state, action) => {
        state.moduleById = action.payload.data;
        state.isLoadingModule = false;
      })
      .addCase(getModuleById.rejected, (state, action) => {
        state.isLoadingModule = false;
      })
      .addCase(updateModuleTopic.pending, (state, action)=>{
        state.isLoadingUpdate = true;
      })
      .addCase(updateModuleTopic.fulfilled, (state, action) => {
        state.isLoadingUpdate = false;
        state.updateSuccess = true;
      })
      .addCase(updateModuleTopic.rejected, (state, action) => {
        console.log(action)
        state.isLoadingUpdate =false;
        state.errorUpdate = action.payload;
      });

  },
});
export const getModuleFromClass = createAsyncThunk(
  "manageFR/getModuleFromClass",
  async ([id], { rejectWithValue }) => {
    const response = await topicService.getModuleFromClass(id);
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);
export const getAllDetailTraineeMark = createAsyncThunk(
  "topicMarkManage/getAllDetailTraineeMark",
  async (payload, { rejectWithValue }) => {
    try {
      const { index, trainee_id, module_id, trainee_name } = payload;
      const response = await topicService.getAllDetailTraineeMark(
        trainee_id,
        module_id
      );
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return {
        id: index,
        name: trainee_name,
        list: response.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getModuleMarkOfAll = createAsyncThunk(
  "manageFR/getModuleMarkOfAll",
  async (id) => {
    const response = await topicService.getAllStudentOfModule(id);
    return response.data.data;
  }
);

export const updateDetailTraineeMark = createAsyncThunk(
  "topicMarkManage/updateDetailTraineeMark",
  async (payload, { rejectWithValue }) => {
    try {
      const { moduleSubjectMarkId, score } = payload;
      const response = await topicService.updateDetailTraineeMark({
        moduleSubjectMarkId,
        score,
      });
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateDetailListTraineeMark = createAsyncThunk(
  "topicMarkManage/updateDetailTraineeMarkAll",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await topicService.updateDetailListTraineeMark(payload);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getModuleById = createAsyncThunk(
  "manageFR/getModuleById",
  async ([id], { rejectWithValue }) => {
    const response = await topicService.getModuleById(id);
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);
export const updateModuleTopic = createAsyncThunk(
  "topicMarkManage/updateModuleTopic",
  async ([id, payload], { rejectWithValue }) => {
    try {
      const response = await topicService.updateModuleTopic([id, payload]);
      if (response?.success === false) {
        return rejectWithValue(response.response.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const { setScore, clearScore } = topicMarkSlice.actions;
export default topicMarkSlice.reducer;
