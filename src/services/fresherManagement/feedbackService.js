import { useApi } from "services/api";
const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com";
const usePublicApi = () => useApi(IDENTITY_API_URL, false);
export const feedbackService = {
  getAllFeedback: async (course) => {
    return usePublicApi().get(
      `user-service/api/classes/${course}/feedbacks`
    );
  
  },
  getAllYear: async () => {
    return usePublicApi().get(
      `class-service/api/classes/year`
    );
  
  },
  getAllCourseOfYear: async (year) => {
    return usePublicApi().get(
      `class-service/api/classes/year/${year}`
    );
  
  },
};

export default feedbackService;
