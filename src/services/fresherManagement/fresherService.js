import { useApi } from "services/api";
import { storage } from "services/storage";

const IDENTITY_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MOCK_ENDPOINT
    : process.env.REACT_APP_MOCK_ENDPOINT;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);
const headers = { "Content-Type": "application/json" };

export const fresherService = {
  getAllFresher: async (pageIndex, limit, params) => {
    if (
      (Object.keys(params).length === 0 && params.constructor === Object) ||
      (params.year === 0 && params.course === "")
    ) {
      return usePublicApi().get(
        `user-service/api/trainees/${pageIndex}/${limit}`
      );
    } else {
      if (params.year !== undefined && params.course !== undefined) {
        return usePublicApi().get(
          `user-service/api/years/${params.year}/classes/${params.course}/trainees/${pageIndex}/${limit}`
        );
      }
    }
  },

  getYearList: () => usePublicApi().get(`class-service/api/classes/year`),

  getCourseList: (year) =>
    usePublicApi().get(`class-service/api/classes/year/${year}`),

  createFresher: (fresher, adminID = 4) =>
    usePublicApi().post(
      `user-service/api/admins/${adminID}/trainees`,
      fresher,
      {
        // headers: { "Content-Type": "application/json" },
      }
    ),

  deleteOneFresher: (id) =>
    usePublicApi().delete(`user-service/api/trainees/${id}`),

  deleteManyFresher: (ids) =>
    usePublicApi().post(`user-service/api/trainees`, { ids }),

  getAllClassInYear: (year) =>
    usePublicApi().get(`class-service/api/classes/year/${year}`),

  updateFresher: (fresher, id) =>
    usePublicApi().put(`user-service/api/admins/trainees/${id}`, fresher, {
      headers,
    }),
  getOneFresher: (id) => usePublicApi().get(`user-service/api/trainees/${id}`),
  importFreshers: (adminID, file) =>
    usePublicApi().post(`user-service/api/users/upload/${adminID}`, file, {
      headers,
    }),
};

export default fresherService;
