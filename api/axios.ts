import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.1.101:5001/api",
  // baseURL: "http://192.168.1.50:5001/api",
  baseURL: "http://172.20.10.9:5001/api",
});

export const axiosPrivate = axios.create({
  // baseURL: "http://192.168.1.101:5001/api",
  // baseURL: "http://192.168.1.50:5001/api",
  baseURL: "http://172.20.10.9:5001/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
