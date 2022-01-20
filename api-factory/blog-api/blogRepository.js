import repository from "./../repository";

const resource = "blogs";

export default {
  getAllBlogs(params) {
    return repository.get(`${resource}`, { params });
  },
  getBlog(id) {
    return repository.get(`${resource}/${id}`);
  },
  postBlog(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateBlog(id, payload) {
    return repository.patch(`${resource}/${id}`, payload);
  },
};
