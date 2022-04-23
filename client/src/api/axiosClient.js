import axios from "axios";
import queryString from "query-string";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
