import { useApi } from "../api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const classDetailsServices = {
  updateClassDetails: (id, body) => usePublicApi().put(`class-service/api/classes/${id}`, body),
  getClassDetails: (id) => usePublicApi().get(`class-service/api/classes/${id}`),
  getMentorList: () => usePublicApi().get(`user-service/api/users/list-user-by-role/Mentor`),
  getTrainerList: () => usePublicApi().get(`user-service/api/users/list-user-by-role/Trainer`),
};

