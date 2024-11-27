import { createContext, ReactNode, useState } from "react";

interface FilterContext {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
}

export interface Filters {
  name: string;
  manufacturer: Number | "";
  size: Number | "";
  wheelSize: Number | "";
  category: Number | "";
  color: Number | "";
  status: Number | "";
  minPrice: Number;
  maxPrice: Number;
  avaible: boolean;
  isElectric: boolean;
  isKids: boolean;
  isWoman: boolean | "";
}
export type NumberKeys = {
  [K in keyof Filters]: Filters[K] extends Number | "" ? K : never;
}[keyof Filters];

export const FilterContext = createContext<FilterContext | undefined>(undefined);

type FilterContextProviderProps = {
  children: ReactNode;
};

export function FilterContextProvider({ children }: FilterContextProviderProps) {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    manufacturer: "",
    size: "",
    wheelSize: "",
    category: "",
    color: "",
    minPrice: 0,
    maxPrice: 100000,
    avaible: true,
    isElectric: false,
    status: "",
    isKids: false,
    isWoman: "",
  });
  const updateFilters = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  return <FilterContext.Provider value={{ filters, updateFilters }}>{children}</FilterContext.Provider>;
}
