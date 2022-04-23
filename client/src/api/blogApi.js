import axiosClient from "./axiosClient";
const BlogApi = {
  getAll: (params) => {
    const url = "/blogs";
    return axiosClient.get(url, { params });
  },
  getQuery: (query) => {
    const url = `/blogs${query}`;
    return axiosClient.get(url);
  },
  get: (id) => {
    const url = `/blog/${id}`;
    return axiosClient.get(url);
  },
};

export default BlogApi;
