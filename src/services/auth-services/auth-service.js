import { useApi } from 'services/api';

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
const usePublicApi = () => useApi(IDENTITY_API_URL);

export const authServices = {
  login : async (p) => {
    return usePublicApi().post(`api/login?username=${p.username}&password=${p.password}`,p)
  },
 
};
