import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userListServices } from "services/UserListServices";

export const getRolesData = createAsyncThunk(
  "UserList/getRolesData",
  async () => {
    const response = await userListServices.getRoleService();
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const getUserData = createAsyncThunk(
  "UserList/getUserData",
  async ({ pageIndex, sizePage, searchFilter }, { rejectWithValue }) => {
    const response = await userListServices.getPageService(
      pageIndex,
      sizePage,
      searchFilter
    );
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const addUserData = createAsyncThunk(
  "UserList/addUserData",
  async (user, { rejectWithValue }) => {
    const response = await userListServices.addUserDataService(user);
    if (response.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const editUserData = createAsyncThunk(
  "UserList/editUserData",
  async (user, { rejectWithValue }) => {
    const responseNoRole = await userListServices.editUserNoRoleService(user);
    if (responseNoRole?.success === false) {
      return rejectWithValue(responseNoRole.response.message);
    }

    const responseRole = await userListServices.editRoleService(user);
    if (responseRole?.success === false) {
      return rejectWithValue(responseRole.response.message);
    }

    return { info: responseNoRole.data, role: responseRole.data };
  }
);

export const deleteUserData = createAsyncThunk(
  "UserList/deleteUserData",
  async (user, { rejectWithValue }) => {
    const response = await userListServices.deleteUserService(user.id);
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

export const deleteMultiUsersData = createAsyncThunk(
  "UserList/deleteMultiUsersData",
  async (users, { rejectWithValue }) => {
    const ids = users.map((user) => parseInt(user.id));
    const response = await userListServices.deleteMultiUsersService(ids);
    if (response?.success === false) {
      return rejectWithValue(response.response.message);
    }
    return response.data;
  }
);

const initialState = {
  userData: [],
  errorUserData: {
    success: true,
    error: "",
  },
  role: [],
  pagination: {
    totalPage: 0,
    pageSize: 10,
    pageNumber: 0,
  },
  searchFilter: {
    search: "",
    filter: [],
  },
  deleteUserID: "",
  editUser: {
    id: "",
    username: "",
    email: "",
    status: true,
    role: [],
  },
  selectedUser: [],
  modalAddUer: {
    show: false,
    error: "",
    success: false,
  },
  modalEditUser: {
    show: false,
    error: "",
    success: false,
  },
};
export const UserListSlice = createSlice({
  name: "UserList",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchFilter.search = action.payload;
    },
    setFilter: (state, action) => {
      state.searchFilter.filter = action.payload;
    },
    toggleAddUserModal: (state, action) => {
      state.modalAddUer = {
        show: !state.modalAddUer.show,
        error: "",
        success: false,
      };
    },
    toggleEditUserModal: (state, action) => {
      state.modalEditUser = {
        show: !state.modalEditUser.show,
        error: "",
        success: false,
      };
    },
    clearErrorUserData: (state, action) => {
      state.errorUserData = {
        success: true,
        error: "",
      };
    },
    handleSelect: (state, action) => {
      if (action.payload.type) {
        state.selectedUser.push(action.payload.user);
      } else {
        for (let i = 0; i < state.selectedUser.length; i++) {
          if (state.selectedUser[i].id === action.payload.user.id) {
            state.selectedUser.splice(i, 1);
            break;
          }
        }
      }
    },
    handleSelectAll: (state, action) => {
      for (let i = 0; i < state.userData.length; i++) {
        const index = state.selectedUser.findIndex(
          (user) => user.id === state.userData[i].id
        );
        if (action.payload) {
          if (index === -1) {
            state.selectedUser.push(state.userData[i]);
          }
        } else {
          if (index !== -1) {
            state.selectedUser.splice(index, 1);
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get role
      .addCase(getRolesData.fulfilled, (state, action) => {
        state.role = action.payload.data.map((role) => ({
          id: role.id,
          role: role.role,
        }));
      })
      // Handle get user ,pagination
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload.data.content;
        state.pagination.totalPage = action.payload.data.totalPages;
        if (action.payload.data.content.length > 0) {
          state.errorUserData = {
            success: true,
            error: "",
          };
        } else {
          
          state.errorUserData = {
            success: false,
            error: "Not match !",
          };
        }
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData = [];
        state.errorUserData = {
          success: false,
          error: action.payload,
        };
      })
      // Handle add user
      .addCase(addUserData.fulfilled, (state, action) => {
        state.userData.push(action.payload.data);
        state.modalAddUer = {
          show: false,
          error: "",
          success: true,
        };
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.modalAddUer = {
          show: true,
          error: action.payload,
          success: false,
        };
      })
      // Handle edit user
      .addCase(editUserData.fulfilled, (state, action) => {
        const index = state.userData.findIndex(
          (user) => user.id === action.payload.info.data.id
        );
        state.userData[index] = {
          ...action.payload.info.data,
          role: action.payload.role.data.role,
        };
        state.modalEditUser = {
          show: false,
          error: "",
          success: true,
        };
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.modalEditUser = {
          show: true,
          error: action.payload,
          success: false,
        };
      })
      // Handle delete user
      .addCase(deleteUserData.fulfilled, (state, action) => {
        const index = state.userData.findIndex(
          (user) => user.id === action.payload.data.id
        );
        state.userData.splice(index, 1);
      })
      .addCase(deleteMultiUsersData.fulfilled, (state, action) => {
        state.selectedUser = [];
        action.payload.data.forEach((data) => {
          const index = state.userData.findIndex((user) => user.id === data.id);
          state.userData.splice(index, 1);
        });
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  handleSelect,
  handleSelectAll,
  setSearch,
  setFilter,
  toggleAddUserModal,
  toggleEditUserModal,
  clearErrorUserData,
} = UserListSlice.actions;

export default UserListSlice.reducer;
