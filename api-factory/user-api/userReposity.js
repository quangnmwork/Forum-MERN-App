import repository from "./../repository";

const resource = "users";

export default {
  login(payload) {
    return repository.post(`${resource}/login`, payload);
  },
  signup(payload) {
    return repository.post(`${resource}/signup`, payload);
  },
  forgotPassword(payload) {
    return repository.post(`${resource}/forgotPassword`, payload);
  },
  resetPassword(payload) {
    return repository.patch(`${resource}/resetPassword`, payload);
  },
  getUserProfile() {
    return repository.get(`${resource}/getUserProfile`);
  },
  updatePassword(payload) {
    return repository.patch(`${resource}/updatePassword`, payload);
  },
  updateProfile(payload) {
    return repository.patch(`${resource}/updateUserProfile`, payload);
  },
};
