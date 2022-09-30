import { storage } from "./storage";
import axios from "axios";
import { resources } from "resources";

export const useApi = (baseUrl = "localhost", useToken = true) => {
  axios.interceptors.request.use(
    (request) => {
      const token = storage.getCache("token");
      // request.baseURL = baseUrl;
      request.baseURL = "https://admin-tool-user-service-bu.herokuapp.com/";
      request.headers.post["Content-Type"] = "x-www-form-urlencoded";
      if (token) {
        // axios.defaults.headers.common['Authorization'] = `Beare ${token}`
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
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

  return axios;
};
class http {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  interceptors = {
    request: undefined,
    response: undefined,
  };

  createRequestWithInterceptor = async (method, body = undefined) => {
    const request = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) request.body = JSON.stringify(body);
    if (typeof this.interceptors.request === "function") {
      return await this.interceptors.request(request);
    }
    return request;
  };

  fetchWithInterceptor = async (url, request) => {
    if (typeof this.interceptors.response === "function")
      return await fetch(url, request).then(this.interceptors.response);
    return await fetch(this.baseUrl + pathAndQuery, request);
  };

  get = async (pathAndQuery) => {
    const request = await this.createRequestWithInterceptor("GET");
    return await this.fetchWithInterceptor(
      this.baseUrl + pathAndQuery,
      request
    );
  };

  post = async (pathAndQuery, body) => {
    const request = await this.createRequestWithInterceptor("POST", body);
    return await this.fetchWithInterceptor(
      this.baseUrl + pathAndQuery,
      request
    );
  };

  put = async (pathAndQuery, body) => {
    const request = await this.createRequestWithInterceptor("PUT", body);
    return await this.fetchWithInterceptor(
      this.baseUrl + pathAndQuery,
      request
    );
  };

  delete = async (pathAndQuery, body) => {
    const request = await this.createRequestWithInterceptor("DELETE", body);
    return await this.fetchWithInterceptor(
      this.baseUrl + pathAndQuery,
      request
    );
  };

  patch = async (pathAndQuery, body) => {
    const request = await this.createRequestWithInterceptor("PATCH", body);
    return await this.fetchWithInterceptor(
      this.baseUrl + pathAndQuery,
      request
    );
  };
}

async function call(url, p, method = "POST", authorize) {
  const headers = { "Content-Type": "application/json" };
  const requestOptions = {
    method: method,
    headers: headers,
    mode: "cors",
    credentials: "include",
  };
  if (authorize) {
    const token = getToken();
    if (token) requestOptions.headers["Authorization"] = "bearer " + token;
  }

  if (method === "POST") {
    requestOptions.body = JSON.stringify(p);
  }
  try {
    const response = await fetch(url, requestOptions);

    // special treatment for 401 and 403
    if (response.status == 401) {
      return {
        response: { message: resources.auth.authorize },
        success: false,
      };
    }
    if (response.status == 403) {
      return {
        response: { message: resources.auth.forbidden },
        success: false,
      };
    }

    // other non-succes non-400 status will be handled generally
    // as our API won't make these types of response
    if (!response.ok && response.status !== 400 && response.status !== 404) {
      return Promise.reject(response);
    }

    const content = await response.text();
    const json = content.length > 0 ? JSON.parse(content) : {};

    return { response: json, success: response.ok };
  } catch (error) {
    // underlying logic error. Eg: json parse error
    // return Promise.reject(error.message);
    return {
      error: error.message || "Something bad happened",
      response: { message: resources.generalError },
    };
  }
}

async function get(endpoint, credentials) {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  const headers = { "Content-Type": "application/json" };
  const params = { method: "GET", headers: headers, mode: "cors" };
  if (credentials) params["credentials"] = "include";

  try {
    const response = await fetch(fullUrl, params);

    if (response.status == 401) {
      return {
        response: { message: resources.auth.authorize },
        success: false,
      };
    }
    if (response.status == 403) {
      return {
        response: { message: resources.auth.forbidden },
        success: false,
      };
    }

    if (!response.ok && response.status !== 400) {
      return Promise.reject(response);
    }

    const content = await response.text();
    const json = content.length > 0 ? JSON.parse(content) : {};

    return { response: json, success: response.ok };
  } catch (error) {
    return {
      error: error.message || "Something bad happened",
      response: { message: resources.generalError },
    };
  }
}

async function upload(param) {
  try {
    const response = await fetch(process.env.CDN_UPLOAD_URL, {
      method: "POST",
      body: param,
    });
    const json = await response.json();
    if (!response.ok && response.status !== 400) {
      return Promise.reject(json);
    }
    return { response: json, success: response.ok };
  } catch (error) {
    return { error: error.message || "Something bad happened" };
  }
}

function addCache(key, v) {
  localStorage.setItem(key, JSON.stringify(v));
}

function getCache(key) {
  try {
    let v = localStorage.getItem(key);
    return JSON.parse(v);
  } catch (e) {
    return null;
  }
}

function removeCache(key) {
  localStorage.removeItem(key);
}

function getToken() {
  return getCache("token");
}

export const api = {
  getCache,
  addCache,
  removeCache,
};
