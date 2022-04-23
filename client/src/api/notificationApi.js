import axiosClient from "./axiosClient";
const NotificationApi = {
  getNotifications: (userId) => {
    const url = `/notification/${userId}`;
    return axiosClient.get(url);
  },
};

export default NotificationApi;
