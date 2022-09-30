import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const gatewayAxios = axios.create({
    baseURL: process.env.IDENTITY_API_URL
});

const userAxios = axios.create({
    baseURL: 'https://admin-tool-user-service-bu.herokuapp.com/'
});
userAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 400 && error.response.data.status != "BAD_REQUEST") {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      if (error.response.status == 401) {
        if(error.response.data.message == "Username or password is wrong!") {
          return {
            response: { message: resources.login.failure },
            success: false,
          }
        }
        if (error.response.data.message == "The Access Token has expired!") {
          const useRefreshApi = () => useApi(process.env.IDENTITY_API_URL)
          const user = api.getCache("user")
          const refreshToken = user.refresh_token
          api.removeCache("token")
          api.addCache("token", refreshToken)
          const getNewToken = async () => {
            const res = await useRefreshApi().get(`api/token/refresh`)
            if(res.success == false)
              return {}
            api.removeCache("user")
            api.removeCache("token")
            api.addCache("user", res.data.data)
            api.addCache("token", res.data.data.access_token)
            return {
              response: { message: resources.auth.reauthorize },
              success: false,
            };
          }
          getNewToken()
        }
        if (error.response.data.message == "The Refresh Token has expired!"){
          api.removeCache("user")
          api.removeCache("token")
          alert("Session Expired. Please log in again.")
          location.reload()
        }
        return {
          response: { message: resources.auth.forbidden },
          success: false,
        };
      }
      if (error.response.status == 403) {
        return {
          response: { message: resources.auth.forbidden },
          success: false,
        };
      }
      if (error.response.status == 404 && error.response.data.status != "NOT_FOUND") {
        return {
          response: { message: resources.generalError },
          success: false,
        };
      }
      if (error.response.status == 409) {
        return {
          response: { message: error.response.data.message },
          success: false,
        };      }

      if (error.response.status == 500) {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      // attendance Errors
      if (error.response.data.status == "NOT_FOUND") {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      if (error.response.data.status == "BAD_REQUEST") {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      if (error.response.data.status == "REQUESTED_RANGE_NOT_SATISFIABLE") {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      if (error.response.data.status == "500") {
        return {
          response: { message: error.response.data.message },
          success: false,
        };
      }
      return Promise.reject(error);
    }
  );

export {
    gatewayAxios,
    userAxios
};