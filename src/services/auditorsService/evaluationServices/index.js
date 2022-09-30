import { useApi } from "services/api";

const usePublicApi = useApi("https://admin-tool-user-service-bu.herokuapp.com/", true);

export const EvaluationServices = {
    getClasses: () => {
        return usePublicApi.get("audit-service/api/schedules/classes");
    },
    getSessions: (id) => {
        return usePublicApi.get(`audit-service/api/number-audit/${id}`);
    },
    getTrainees: (classID, sessionID, index) => {
        return usePublicApi.get(`audit-service/api/audit-results/${classID}/${sessionID}?page=${index}&size=20`);
    },
    getEvaluate: (id) => {
        return usePublicApi.get(`audit-service/api/audit-results/trainee/${id}`);
    }
}