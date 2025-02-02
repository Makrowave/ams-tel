import axios from "axios";
import Constants from "expo-constants";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
