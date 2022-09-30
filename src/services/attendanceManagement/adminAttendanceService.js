import { useApi } from "services/api";
const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
import { storage } from "services/storage";


const usePublicApi = () => useApi(IDENTITY_API_URL, true);

const headers = { "Content-Type": "application/json" };

export const adminAttendanceService = {
    getAttendanceList: async (classId, month, year) => {
        return usePublicApi().get(`user-service/api/attendance/classes?classId=${classId}&month=${month}&year=${year}`);
    },
    getClassList: async () => {
        const userID= storage.getCache("user").id;
        return usePublicApi().get(`class-service/api/classes/admin/${userID}`);
    },
    changeAttendStatus: async (traineeId, date, status) => {
        return usePublicApi().put(`user-service/api/attendance?traineeId=${traineeId}&date=${date}&status=${status}`);
    }
};

