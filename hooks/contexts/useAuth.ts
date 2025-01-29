import AuthContext from "@/components/contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext);
  if(!context) {
        throw new Error('useAuth must be used within within an AuthProvider');
    }
    return context;
}