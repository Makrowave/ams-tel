import { decodeToken } from "react-jwt";
import { AxiosError, isAxiosError } from "axios";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import axios, { axiosPrivate } from "@/api/axios";


interface Token {
    name: string
}

export default function useRefreshUser() {
  const { setUser, getRefreshToken } = useAuth();
  const _refreshUrl = "/MobileAuth/Refresh";
  async function refreshUser() {
    try {
      const response = await axiosPrivate.get(_refreshUrl, {
        headers: {
            Authorization: `Bearer ${await getRefreshToken()}`
        },
        withCredentials: true,
      });
      setUser({ username: decodeToken<Token>(response.data)?.name ?? "", token: response.data });
      return true
    } catch (e) {
        if(isAxiosError(e)) {
            const error = e as AxiosError
            if (error?.response?.status !== undefined) {
        console.log(error?.response?.status + ": Invalid user session");
      } else {
        console.log(error);
      }
        }
        console.log(e);
        
      
      setUser({ username: "", token: "" });
      return false;
    }
  }
  return refreshUser;
}
