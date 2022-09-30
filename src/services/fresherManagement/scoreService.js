import { useApi } from "services/api";

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com";
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };
export const scoreService = {
  getAllClass: async () => {
    return usePublicApi().get(`/class-service/api/classes?limit=100&page=1`);
  },
  getFresherFromClass: async (id, pageNumber) => {
    return usePublicApi().get(
      `user-service/api/grades/class/${id}/page/${pageNumber}/page-size/6`
    );
  },
  getMonthFromClass: async (id) => {
    return usePublicApi().get(`user-service/api/grades/class/${id}`);
  },
  getFresherFromClassWithMonth: async (id, month, pageNumber) => {
    return usePublicApi().get(
      `user-service/api/grades/class/${id}/month/${month}/page/${pageNumber}/page-size/6`
    );
  },
};
