import { useApi } from "../api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL,  true);

export const moduleServices = {
  createModule: (body) => {
    return usePublicApi().post(("class-service/api/trainings/module"), body)
  },

  getListModule: ({page, limit,search = ""}) => {   
    return usePublicApi().get(`class-service/api/trainings/module?page=${page}&limit=${limit}&search=${search}`);
  },
  deleteModule: (id) => usePublicApi().delete(`class-service/api/trainings/module/` +id)
};
