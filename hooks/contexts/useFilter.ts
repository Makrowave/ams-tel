import { FilterContext } from "@/components/contexts/FilterContext";
import { useContext } from "react";

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within within an FilterProvider");
  }
  return context;
}
