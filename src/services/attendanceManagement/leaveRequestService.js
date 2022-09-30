import { useApi } from "services/api";
import { storage } from 'services/storage';

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };

export const leaveRequestService = {
    getLeaveRequest: async (traineeId) => {
        return usePublicApi().get(`user-service/api/ticket/trainee?traineeId=${traineeId}`);
    },
    addRequest: (body) => usePublicApi().post("user-service/api/ticket/", body),
};
