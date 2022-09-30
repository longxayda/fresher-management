import { stringify } from 'query-string';
import { useApi } from './api';

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";

const usePublicApi = () => useApi(userToken = false);

export const userServices = {
  login: p => usePublicApi().post('v1/users/login', p),
};
