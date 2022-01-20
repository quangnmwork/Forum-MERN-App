import repository from "./../repository";

const resource = "comments";

export default {
  getCommentByBlogId(id) {
    return repository.get(`blogs/${id}/${resource}`);
  },
  postCommentByBlogId(id, payload) {
    return repository.post(`blogs/${id}/${resource}/`, payload);
  },
  editCommentByBlogId(id, payload, commentId) {
    return repository.patch(`blogs/${id}/${resource}/${commentId}`, payload);
  },
  deleteCommentByBlogId(id, commentId) {
    return repository.delete(`blogs/${id}/${resource}/${commentId}`);
  },
};
