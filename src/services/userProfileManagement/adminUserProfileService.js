import { useApi } from "services/api";
const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";

const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };

export const adminUserProfileService = {
    getAdminUserProfile: async () => {
        const adminId = storage.getCache("user").id
        return usePublicApi().get(`user-service/api/admins/${adminId}`);
    },
    updateAdminUserProfile: async (body) => {
        const adminId = storage.getCache("user").id
        return usePublicApi().put(`user-service/api/admins/${adminId}`, body);
    }
};
