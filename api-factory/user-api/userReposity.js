import repository from "./../repository";

const resource = "users";

export default {
  login(payload) {
    console.log(repository);
    return repository.post(`${resource}/login`, payload);
  },
  signup(payload) {
    return repository.post(`${resource}/signup`, payload);
  },
  resendEmail() {
    return repository.get(`${resource}/resendEmail`);
  },
  getProfile() {
    return repository.get("/getUserProfile");
  },
  updatePassword(payload) {
    return repository.patch(`${resource}/updatePassword`, payload);
  },
  updateProfile(payload) {
    return repository.patch(`${resource}/updateUserProfile`, payload);
  },
};
