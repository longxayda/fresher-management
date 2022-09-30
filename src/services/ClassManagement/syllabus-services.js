import { useApi } from "../api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;

const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const syllabusServices = {                     
    createSyllabus: (id,body) => usePublicApi().post(`class-service/api/trainings/topic/${id}/syllabus`,body),
    getListSyllabus: (id) => usePublicApi().get(`class-service/api/trainings/topic/${id}/syllabuses`),
    deleteSyllabus: (id) => usePublicApi().delete(`class-service/api/trainings/topic/syllabus/${id}`),
};
