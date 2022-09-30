import { useApi } from "services/api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;

const usePublicApi = () => useApi(IDENTITY_API_URL);

export const authServices = {
  login: async (p) => {
    return usePublicApi().post(`api/login`, p);
  }
};
