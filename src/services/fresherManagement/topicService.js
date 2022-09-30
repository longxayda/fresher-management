import axios from "axios";
import { useApi } from "services/api";

const IDENTITY_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PUBLIC_ENDPOINT
    : process.env.REACT_APP_MOCK_ENDPOINT;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
export const topicService = {
  getModuleFromClass: async (id) => {
    return usePublicApi().get(`/user-service/api/classes/${id}/modules`);
  },
  getAllDetailTraineeMark: async (traineeId, moduleId) => {
    return usePublicApi().get(
      `/user-service/api/grades/trainee/${traineeId}/module/${moduleId}/module-mark`
    );
  },
  updateDetailTraineeMark: async (body) => {
    return usePublicApi().put(
      "/user-service/api/grades/module-subject-mark",
      body
    );
  },
  updateDetailListTraineeMark: async (body) => {
    return usePublicApi().put(
      "/user-service/api/grades/module-subject-mark-list",
      {
        listScore: body,
      }
    );
  },
  getAllStudentOfModule: async (id) => {
    return usePublicApi().get(
      `/user-service/api/grades/modules/${id}/module-marks`
    );
  },
  getModuleById: async (id) => {
    return usePublicApi().get(`/user-service/api/module/${id}`);
  },
  updateModuleTopic: async ([id, payload]) => {
    console.log(payload);
    return usePublicApi().put(`/user-service/api/module/${id}`, {
      name: payload.name,
      classId: payload.classId,
      classModuleId: payload.classModuleId,
      quizWeight: payload.quizWeight,
      assignmentWeight: payload.assignmentWeight,
      finalWeight: payload.finalWeight,
    });
  },
};
