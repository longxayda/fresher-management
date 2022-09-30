import { useApi } from './api';

const IDENTITY_API_URL = "https://admin-tool-api-gateway-bu.herokuapp.com/";
const usePublicApi = () => useApi(IDENTITY_API_URL, false);

export const otpServices = {
  sendOtp: p => usePublicApi().post('v1/otps/send', p),
  verifyOtp: p => usePublicApi().post('v1/otps/verify', p)
};
