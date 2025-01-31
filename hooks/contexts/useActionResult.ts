import { ActionResult } from "@/components/contexts/ActionResultContext";
import { useContext } from "react";

export function useActionResult() {
  const context = useContext(ActionResult);
  if (!context) {
    throw new Error("useActionResult must be used within within an ActionResultProvider");
  }
  return context;
}
