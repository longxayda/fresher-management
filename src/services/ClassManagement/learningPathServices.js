import { useApi } from "../api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;


const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const learningPathServices = {
  
  getLearningPath: (classid) => usePublicApi().get("class-service/api/learning-path/classes/"+classid+"?page=1&limit=500"),
  updateLearningPathModule: (classId, body) => 
    usePublicApi().post("class-service/api/learning-path/classes/"+classId, body),
  updateLearningPath: (classid,body) => usePublicApi().put("class-service/api/learning-path/classes/"+classid+"/topics", body),
  getListAllModule: (page, limit, search) => 
    usePublicApi().get(`class-service/api/trainings/module?page=${page}&limit=${limit}&search=${search}`),
};
