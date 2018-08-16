import axios from "axios";
import { getToken } from "./auth";
const headers = getToken() ? { Authorization: `Bearer ${getToken()}` } : {};

export default axios.create({
  baseURL: "http://127.0.0.1:3333",
  headers
});
