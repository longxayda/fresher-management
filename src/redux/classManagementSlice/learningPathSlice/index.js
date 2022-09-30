import {createSlice} from "@reduxjs/toolkit";
import {learningPathServices} from "services/ClassManagement/learningPathServices.js";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { roleServices } from "services/index";

export const getListAllModule = createAsyncThunk("class/getListAllModule", async ([page, limit, search]) => {
  const res = await learningPathServices.getListAllModule(page, limit, search);
  if(res.data){}
  const data = res.data.data;
  const parsedData = data.map((ele) => {
    return { 
        id: ele.id,
        moduleName: ele.moduleName,
        duration: ele.duration  
    };
})
  return { 
    data: parsedData,
    totalPage: res.data.page
  };
});

export const getListClassModules = createAsyncThunk("class/getListClassModules", async (classid) => {
    const res = await learningPathServices.getLearningPath(classid);
    if(res.data){
      return res.data.data;
    }else{
      rejectWithValue(null);
    }
});

export const updatePicClassTopics = createAsyncThunk("class/putPicClassTopics", async ([classid,body]) => {
  const res = await learningPathServices.updateLearningPath(classid,body);
  if(res.data.length > 0) {
    const data = await learningPathServices.getLearningPath(classid);
    return data.data.data;
  }else{
    rejectWithValue(null);
  }
});

export const updateListClassModules = createAsyncThunk("class/putListClassModules", async ([classId, body]) => {
  const res = await learningPathServices.updateLearningPathModule(classId, body);
  if(res.data == 'create success') {
    const data = await learningPathServices.getLearningPath(classId);
    return data.data.data;
  }else{
    rejectWithValue(null);
  }
});

export const getListRole = createAsyncThunk("class/getListRole", async () => {
  const res = await roleServices.getRoleList();
  if(res.data){
    return res.data.data;
  }else{
    rejectWithValue(null);
  }
});

const initialState = {
  listClassModules: [],
  isClassModulesLoading: false,
  listAllModule: [],
  allModuleTotalPage: 0,
  listRoles: [],
  isAllModuleLoading: false,
  successMessage: null,
  err: null,
};

export const learningPathSlice = createSlice({
  name: "learning-path",
  initialState,
  reducers: {
    setSuccessMessage(state){
      state.successMessage = null;
    },
    setErrMessage(state){
      state.err = null;
    }
  },
  extraReducers: {
    [getListAllModule.pending]: (state, action) => {
      state.isAllModuleLoading = true;
    },
    [getListAllModule.fulfilled]: (state, action) => {
      state.isAllModuleLoading = false;
      state.listAllModule = action.payload.data;
      state.allModuleTotalPage = action.payload.totalPage;
    },
    [getListAllModule.rejected]: (state, action) => {
      state.isClassModulesLoading = false;
      state.err = "Can not get modules";
    },

    [getListClassModules.loading]: (state, action) => {
        state.isClassModulesLoading = true;
    },
    [getListClassModules.fulfilled]: (state, action) => {
        state.isClassModulesLoading = false;
        state.listClassModules = action.payload;
    },
    [getListClassModules.rejected]: (state, action) => {
      state.isClassModulesLoading = false;
      state.err = "Can not get class learning path";
    },

    [updatePicClassTopics.pending]: (state, action) => {
        state.isClassModulesLoading = true;
    },
    [updatePicClassTopics.fulfilled]: (state, action) => {
      state.isClassModulesLoading = false;
      state.listClassModules = action.payload;
      state.successMessage="Update topic success";
    },
    [updatePicClassTopics.rejected]: (state, action) => {
      state.isClassModulesLoading = false;
      state.err = "Update pic fail";
    },

    [updateListClassModules.pending]: (state, action) => {
        state.isClassModulesLoading = true;
    },
    [updateListClassModules.fulfilled]: (state, action) => {
      state.isClassModulesLoading = false;
      state.listClassModules = action.payload;
      state.successMessage="Update class module success";
    },
    [updateListClassModules.rejected]: (state, action) => {
      state.isClassModulesLoading = false;
      state.err = "Update class modules fail";
    },
    
    [getListRole.loading]: (state, action) => {
        state.isClassModulesLoading = true;
    },
    [getListRole.fulfilled]: (state, action) => {
        state.isClassModulesLoading = false;
        state.listRoles = action.payload;
    },
    [getListRole.rejected]: (state, action) => {
      state.isClassModulesLoading = false;
      state.err = "Can not get role list";
    },
  },
});

export const {setSuccessMessage, setErrMessage} = learningPathSlice.actions;

export default learningPathSlice.reducer;
