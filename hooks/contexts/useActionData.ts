import { ActionDataContext } from "@/components/contexts/ActionDataContext";
import { useContext } from "react";

export function useActionData() {
  const context = useContext(ActionDataContext);
  if (!context) {
    throw new Error("useActionData must be used within within an ActionDataProvider");
  }
  return context;
}
