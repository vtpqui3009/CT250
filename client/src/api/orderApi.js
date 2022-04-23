import axiosClient from "./axiosClient";
const OrderApi = {
  getMyOrder: () => {
    const url = "/orders/me";
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
  createNewOrder: (body) => {
    const url = `/order/new`;
    return axiosClient.post(url, body);
  },
  checkout: (body) => {
    const url = `create-checkout-session`;
    return axiosClient.get(url, body);
  },
};

export default OrderApi;
