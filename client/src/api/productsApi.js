import axiosClient from "./axiosClient";
const ProductApi = {
  getAll: (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getQuery: (query) => {
    const url = `/products${query}`;
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  searchProduct: (query) => {
    const url = `products?keyword=${query}`;
    return axiosClient.get(url);
  },
};

export default ProductApi;
