import axiosClient from "./axiosClient";
const UserApi = {
  getUserProfile: (params) => {
    const url = "/me";
    return axiosClient.get(url, { params });
  },
  updateUserProfile: (body) => {
    const url = "/me/update";
    return axiosClient.put(url, body);
  },
  getMyAddress: (username) => {
    const url = "/address/my";
    return axiosClient.get(url, username);
  },
  createNewAddresses: (body) => {
    const url = "/address/new";
    return axiosClient.post(url, body);
  },
  loginUser: (body) => {
    const url = "/login";
    return axiosClient.post(url, body);
  },
  registerUser: (body) => {
    const url = "/register";
    return axiosClient.post(url, body);
  },
};

export default UserApi;
