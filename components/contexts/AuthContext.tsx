import axios, { axiosPrivate } from "@/api/axios";
import { createContext, ReactNode, useState } from "react";
import * as Keychain from "react-native-keychain";

interface AuthContext {
  getRefreshToken: () => Promise<string>;
  saveRefreshToken: (token: string) => Promise<void>;
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}
interface User {
  username: string;
  token: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({ username: "", token: "" });
  const _logoutUrl = "/Auth/Logout";
  function logout() {
    Keychain.resetGenericPassword();
    setUser({ username: "", token: "" });
  }

  const getRefreshToken = async () => {
    const token = await Keychain.getGenericPassword();
    if (token) {
      return token.password;
    } else {
      console.log("No token");
      return "";
    }
  };
  const saveRefreshToken = async (token: string) => {
    await Keychain.setGenericPassword("amsRefreshToken", token);
  };

  return (
    <AuthContext.Provider
      value={{
        getRefreshToken,
        saveRefreshToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
