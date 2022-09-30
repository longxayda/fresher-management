import { useApi } from "services/api";

const IDENTITY_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MOCK_ENDPOINT
    : process.env.REACT_APP_MOCK_ENDPOINT;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const penaltyService = {
    getBonusPenalty: async (userId, queryParams) => {
        if(queryParams ==="All" || queryParams === "")  
            return usePublicApi().get(`/user-service/api/bonus-penalty/user/${userId}`);
        else
            return usePublicApi().get(`/user-service/api/bonus-penalty/user/${userId}/month/${queryParams}`)
    },
    addBonusPenalty: (bonusPenalty) =>   
        usePublicApi().post('/user-service/api/bonus-penalty', bonusPenalty),

    updateBonusPenalty: (bonusPenalty, id) =>
        usePublicApi().put(`/user-service/api/bonus-penalty/${id}`, bonusPenalty),

    deleteOneBonusPenalty: (id) => usePublicApi().delete(`/user-service/api/bonus-penalty/${id}`),

    deleteManyBonusPenalty: (ids) =>  usePublicApi().patch('/user-service/api/bonus-penalty/delete-requests', ids),

    getMonth: (userId) => usePublicApi().get(`/user-service/api/grades/user/${userId}`)

};

export default penaltyService;