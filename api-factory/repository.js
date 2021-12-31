import axios from "axios";

const url = `http://127.0.0.1:8000/api/v1/`;

export default axios.create({
  baseURL: url,
});
