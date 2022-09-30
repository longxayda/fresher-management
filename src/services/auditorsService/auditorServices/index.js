import { api } from "services/api";
import { useApi } from "services/api";

const usePublicApi = () => useApi("https://admin-tool-api-gateway-bu.herokuapp.com/", true);

export const auditorServices = {
    getPageAuditorList: async (body) => {
        return usePublicApi().get(`user-service/api/auditor/?page=${body.currentPageIndex}&size=20&key=${body.searchKey}`);
    },
    addAuditor: async (body) => {
        return usePublicApi().post(`user-service/api/auditor/?username=${body}`);
    },
    deleteAuditor: async (body) => {
        return usePublicApi().post(`user-service/api/auditor/delete?ids=${body}`);
    },
}