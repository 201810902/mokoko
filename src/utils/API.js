import axios from "axios";

const API = axios.create({
  BASE_URL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default API;
