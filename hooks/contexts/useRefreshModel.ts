import { RefreshModel } from "@/components/contexts/RefreshModelContext";
import { useContext } from "react";

export function useRefreshModel() {
  const context = useContext(RefreshModel);
  if (!context) {
    throw new Error("useRefreshModel must be used within within an RefreshModelProvider");
  }
  return context;
}
