import { decodeToken } from "react-jwt";
import { AxiosError, isAxiosError } from "axios";
import useAuth from "./useAuth";
import axios from "@/api/axios";

interface Token {
  name: string;
  employee: string;
}

export default function useRefreshUser() {
  const { setUser, getRefreshToken } = useAuth();
  const _refreshUrl = "/MobileAuth/Refresh";
  async function refreshUser() {
    try {
      const response = await axios.get(_refreshUrl, {
        headers: {
          Authorization: `Bearer ${await getRefreshToken()}`,
        },
        withCredentials: true,
      });
      const decodedToken = decodeToken<Token>(response.data);
      //Token should always be in response
      setUser({ username: decodedToken!.name ?? "", employeeKey: decodedToken!.employee, token: response.data });
      return response.data;
    } catch (e) {
      if (isAxiosError(e)) {
        const error = e as AxiosError;
        if (error?.response?.status !== undefined) {
          console.log(error?.response?.status + ": Invalid user session");
        } else {
          console.log(error);
        }
      }
      console.log(e);

      setUser({ username: "", employeeKey: "", token: "" });
      return "";
    }
  }
  return refreshUser;
}
