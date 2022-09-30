import { useApi } from "services/api";

const usePublicApi = useApi("https://admin-tool-api-gateway-bu.herokuapp.com/", true);

export const createNewAuditService = {
    getAuditorList: () => {
        return usePublicApi.get("audit-service/api/schedules/auditors");
    },
    getTraineeClassList: () => {
        return usePublicApi.get("audit-service/api/schedules/classes");
    },
    getModuleList: (id) => {
        return usePublicApi.get(`audit-service/api/schedules/modules/${id}`);
    },
    getSessionList: (id) => {
        return usePublicApi.get(`audit-service/api/number-audit/${id}`);
    },
    getTraineeList: (id) => {
        return usePublicApi.get(`audit-service/api/schedules/trainees/${id}`);
    },
    addNewAudit: (payload) => {
        return usePublicApi.post(`audit-service/api/schedules/2003`, payload);
    }
}