import { ProviderNodeProps } from "@/constants/Types";
import { createContext, ProviderProps, ReactNode, useState } from "react";

interface FilterContext {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  getQueryString: () => string;
  resetFilters: () => void;
}

export interface ColorFilter {
  id: Number | "";
  name: string;
  color: string;
}

export interface StringFilter {
  id: Number | "";
  name: string;
}

export interface Filters {
  name: string;
  manufacturer: StringFilter;
  size: Number | "";
  wheelSize: Number | "";
  category: StringFilter;
  color: ColorFilter;
  status: StringFilter;
  minPrice: Number;
  maxPrice: Number;
  avaible: boolean;
  isElectric: boolean;
  isKids: boolean;
  isWoman: boolean | "";
}
export type NumberKeys = {
  [K in keyof Filters]: Filters[K] extends boolean | (boolean | "") ? never : K;
}[keyof Filters];

export const FilterContext = createContext<FilterContext | undefined>(undefined);

export function FilterContextProvider({ children }: ProviderNodeProps) {
  const defaultFilter = {
    name: "",
    manufacturer: { id: "", name: "Dowolny" },
    size: "",
    wheelSize: "",
    category: { id: "", name: "Dowolny" },
    color: { id: "", name: "Dowolny", color: "#ffffff" },
    minPrice: 0,
    maxPrice: 100000,
    avaible: true,
    isElectric: false,
    status: { id: "", name: "" },
    isKids: false,
    isWoman: "",
  };
  const [filters, setFilters] = useState<Filters>(defaultFilter as Filters);
  const getQueryString = () => {
    return `?placeId=0
&avaible=${filters.avaible}
&manufacturerId=${filters.manufacturer.id}
&wheelSize=${filters.wheelSize}
&frameSize=${filters.size}
&name=${filters.name.trim().toLowerCase()}
&electric=${filters.isElectric}
&statusId=${filters.status.id}
&isWoman=${filters.isWoman}
&isKids=${filters.isKids}
&minPrice=${filters.minPrice}
&maxPrice=${filters.maxPrice}
&colorId=${filters.color.id}
&categoryId=${filters.category.id}`.replaceAll("\n", "");
  };

  const updateFilters = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const resetFilters = () => {
    setFilters(defaultFilter as Filters);
  };
  return (
    <FilterContext.Provider value={{ filters, updateFilters, getQueryString, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
