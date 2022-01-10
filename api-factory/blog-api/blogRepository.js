import repository from "./../repository";

const resource = "blogs";

export default {
  getAllBlogs() {
    return repository.get(`${resource}`);
  },
  getBlog(id) {
    return repository.get(`${resource}/${id}`);
  },
  postBlog(payload) {
    return repository.get(`${resource}`, payload);
  },
  updateBlog(id, payload) {
    return repository.patch(`${resource}/${id}`, payload);
  },
};
