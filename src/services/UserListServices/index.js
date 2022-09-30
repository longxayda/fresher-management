import { useApi } from "services/api";
import { storage } from "services/storage";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);

const headers = { "Content-Type": "application/json" };

export const userListServices = {
  getRoleService: async () => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().get(`/user-service/api/role/all/${userIndentity.id}`);
  },
  getPageService: async (pageIndex, size, params) => {
    const userIndentity = storage.getCache("user");
    if (params.search === "" && params.filter.length === 0) {
      return usePublicApi().get(
        `user-service/api/users/page/${pageIndex - 1}/${size}/${
          userIndentity.id
        }`
      );
    } else if (params.search !== "" && params.filter.length === 0) {
      console.log(params.search);
      return usePublicApi().get(
        `user-service/api/users/page/${pageIndex - 1}/${size}/${
          userIndentity.id
        }/search/${params.search}`
      );
    } else if (params.search === "" && params.filter.length !== 0) {
      const filter = params.filter.join(",");
      return usePublicApi().post(
        `user-service/api/users/page/${pageIndex - 1}/${size}/${
          userIndentity.id
        }/filter`,
        params.filter
      );
    } else {
      const filter = params.filter.join(",");
      return usePublicApi().post(
        `user-service/api/users/page/${pageIndex - 1}/${size}/${
          userIndentity.id
        }/filter/search`,
        {
          search: params.search,
          roles: params.filter,
        }
      );
    }
  },
  addUserDataService: async (user) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().post(
      `/user-service/api/users/${userIndentity.id}`,
      user,
      {}
    );
  },
  editUserNoRoleService: async (user) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().put(
      `/user-service/api/users/${userIndentity.id}`,
      user,
      {}
    );
  },
  editRoleService: async (user) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().put(
      `user-service/api/user-roles/${userIndentity.id}?id=${user.id}`,
      { role: user.role },
      {}
    );
  },
  deleteUserService: async (id) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().delete(
      `user-service/api/users/${userIndentity.id}/${id}`
    );
  },
  deleteMultiUsersService: async (ids) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().put(
      `/user-service/api/users/${userIndentity.id}/delete`,
      ids,
      {}
    );
  },
};
