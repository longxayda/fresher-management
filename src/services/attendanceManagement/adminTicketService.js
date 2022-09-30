import { useApi } from "services/api";

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };
import { storage } from "services/storage";

export const adminTicketService = {
    getTicketList: async (classId, month, year) => {
        return usePublicApi().get(`user-service/api/ticket/classes?classId=${classId}&month=${month}&year=${year}`);
    },
    getClassList: async () => {
        const userID = storage.getCache("user").id;
        return usePublicApi().get(`class-service/api/classes/admin/${userID}`);
    },
    handleTicketRequest: async (object) => {
        return usePublicApi().put(`user-service/api/ticket/`, object)
    },
    handleTicketRequestAll: async (object) => {
        return usePublicApi().put(`user-service/api/ticket/all`, object)
    }
};

