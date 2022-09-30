import { useApi } from "../api";
const IDENTITY_API_URL = process.env.IDENTITY_API_URL;
const usePublicApi = () => useApi(IDENTITY_API_URL, true);

export const classServices = {
  createClass: (body) =>
    usePublicApi().post("class-service/api/classes", body),
  getListClass: ({ page, limit }) =>
    usePublicApi().get(
      `class-service/api/classes?page=${page}&limit=${limit}`
    ),
  getListSkill: () =>
    usePublicApi().get("class-service/api/classes/technical-group"),
  getListAdmin: ({ page, limit }) =>
    usePublicApi().get('user-service/api/users/list-user-by-role/Admin'),
};
