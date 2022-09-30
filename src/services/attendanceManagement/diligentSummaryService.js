import { useApi } from "services/api";
import { storage } from "services/storage";


const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };

export const diligentSummaryService = {
    getDiligentSummaryList: async () => {
        const userID= storage.getCache("user").id;
        return usePublicApi().get(`user-service/api/attendance/diligent-summary?traineeId=${userID}`);
    },
};
