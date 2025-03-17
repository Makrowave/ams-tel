import { ProviderNodeProps } from "@/constants/Types";
import { createContext, useState } from "react";
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
  employeeKey: string;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: ProviderNodeProps) {
  const [user, setUser] = useState({ username: "", employeeKey: "", token: "" });
  function logout() {
    Keychain.resetGenericPassword();
    setUser({ username: "", employeeKey: "", token: "" });
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
