import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { roleServices } from "services/index";

const initialState = {
  roleList: [],
  permissionList: [],
  notification: {
    show: false,
    success: true,
    message: "",
    flag: false,
  },
  isLoading: false,
};

export const getPermissionList = createAsyncThunk(
  "role/getPermissionList",
  async () => {
    const res = await roleServices.getPermissionList();
    return res.data;
  }
);

export const getRoleList = createAsyncThunk(
  "role/getRoleList",
  async (resData) => {
    if (resData && resData.type === "edit") {
      return resData;
    } else if (resData && resData.type === "add") {
      return resData;
    } else {
      const res = await roleServices.getRoleList();
      return res.data;
    }
  }
);

export const addRole = createAsyncThunk(
  "role/addRole",
  async (body, thunkAPI) => {
    const res = await roleServices.addRole({
      roleName: body.roleName,
      isEnabled: body.isEnabled,
      permissionList: body.permissionList,
    });
    if (res.success === false) {
      return thunkAPI.rejectWithValue(res.response.message);
    } else {
      res.data.type = "add";
      thunkAPI.dispatch(getRoleList(res.data));
      return res.data;
    }
  }
);

export const editRole = createAsyncThunk(
  "role/editRole",
  async (body, thunkAPI) => {
    const res = await roleServices.editRole({
      roleId: body.roleId,
      roleName: body.roleName,
      isEnabled: body.isEnabled,
      permissionList: body.permissionList,
    });
    if (res.success === false) {
      return thunkAPI.rejectWithValue(res.response.message);
    } else {
      res.data.type = "edit";
      thunkAPI.dispatch(getRoleList(res.data));
      return res.data;
    }
  }
);

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    closeNotification: (state, action) => {
      state.notification.show = false;
    },
  },
  extraReducers: {
    [getPermissionList]: (state, action) => {
      state.isLoading = true;
    },
    [getRoleList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getPermissionList.fulfilled]: (state, action) => {
      if (action.payload) {
        state.permissionList = action.payload.data.map((permission) => {
          return {
            id: permission.id,
            rightName: permission.name,
            description: permission.description,
            code: permission.code,
          };
        });
        state.isLoading = false;
      }
    },
    [getRoleList.fulfilled]: (state, action) => {
      if (action.payload) {
        if (action.payload.type === "add") {
          const newRole = {
            id: action.payload.data.id,
            roleName: action.payload.data.role,
            rights: action.payload.data.permission,
            status: action.payload.data.isEnabled,
          };
          state.roleList.push(newRole);
        } else if (action.payload.type === "edit") {
          const editedRole = {
            id: action.payload.data.id,
            roleName: action.payload.data.role,
            rights: action.payload.data.permission,
            status: action.payload.data.isEnabled,
          };
          const objIndex = state.roleList.findIndex(
            (obj) => obj.id === editedRole.id
          );
          state.roleList[objIndex] = editedRole;
        } else {
          state.roleList = action.payload.data.map((role) => {
            return {
              id: role.id,
              roleName: role.role,
              rights: role.permission,
              status: role.isEnabled,
            };
          });
        }
        state.isLoading = false;
      }
    },
    [addRole.fulfilled]: (state, action) => {
      state.notification = {
        show: true,
        success: true,
        message: `Create role ${action.payload.data.role} successfully!`,
        flag: !state.notification.flag,
      };
    },
    [editRole.fulfilled]: (state, action) => {
      state.notification = {
        show: true,
        success: true,
        message: `Update role ${action.payload.data.role} successfully!`,
        flag: !state.notification.flag,
      };
    },
    [getPermissionList.rejected]: (state, action) => {
      state.notification = {
        show: true,
        success: false,
        message: `Unable to load permission data. Please try again!`,
        flag: !state.notification.flag,
      };
      state.isLoading = false;
    },
    [getRoleList.rejected]: (state, action) => {
      state.notification = {
        show: true,
        success: false,
        message: `Unable to load role data. Please try again!`,
        flag: !state.notification.flag,
      };
      state.isLoading = false;
    },
    [addRole.rejected]: (state, action) => {
      state.notification = {
        show: true,
        success: false,
        message: action.payload,
        flag: !state.notification.flag,
      };
    },
    [editRole.rejected]: (state, action) => {
      state.notification = {
        show: true,
        success: false,
        message: action.payload,
        flag: !state.notification.flag,
      };
    },
  },
});

export const { closeNotification } = roleSlice.actions;

export default roleSlice.reducer;
