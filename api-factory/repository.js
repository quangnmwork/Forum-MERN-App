import axios from "axios";

const url = `http://127.0.0.1:8000/api/v1/`;

const axiosClient = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { crossDomain: true, "Content-Type": "application/json" },
  paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async config => {
  const customHeaders = {};
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (accessToken) {
    customHeaders.Authorization = accessToken;
  }

  return {
    ...config,
    headers: {
      Authorization: accessToken, // auto attach token
      // ...config.headers, // but you can override for some requests
    },
  };
});
export default axiosClient;
