import axiosClient from "./axiosClient";
const CommentApi = {
  getProductReview: (productId) => {
    const url = `/comments/${productId}`;
    return axiosClient.get(url);
  },
  getQuery: (query) => {
    const url = `/products${query}`;
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
};

export default CommentApi;
