import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {axios} from "@/api/axios"

export default function useAxios() {
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      async (config) => {
        const apiUrl = await AsyncStorage.getItem("apiUrl") ?? ""
        console.log("ApiURL: ", apiUrl + "/api");
        config.baseURL = apiUrl + "/api"
        return config;
      },
      (error) => {return Promise.reject(error)}
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, []);

  return axios;
}
