import { useApi } from "services/api";

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com";
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };
import { storage } from "services/storage";

export const traineeUserProfileService = {
    submitFeedbacks: async (feedbackItems) => {
        const userID= storage.getCache("user").id;
        return usePublicApi().post(`/user-service/api/trainees/${userID}/feedbacks`, feedbackItems)
    }, 
};
