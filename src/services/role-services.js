import { useApi } from "./api";
import { storage } from "services/storage";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;

const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const roleServices = {
  getPermissionList: () => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().get(
      `/user-service/api/permission/${userIndentity.id}`
    );
  },

  getRoleList: () => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().get(`/user-service/api/role/all/${userIndentity.id}`);
  },

  addRole: (body) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().post(
      `/user-service/api/role/${userIndentity.id}`,
      body
    );
  },
  editRole: (body) => {
    const userIndentity = storage.getCache("user");
    return usePublicApi().put(
      `/user-service/api/role/${userIndentity.id}`,
      body
    );
  },
};
