import { useApi } from "../api";

const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const topicServices = {
    createTopic: (body, id) => usePublicApi().post("/class-service/api/trainings/module/" + id + "/topic", body),
    getListTopic: (id) => usePublicApi().get('/class-service/api/trainings/module/' + id),
};