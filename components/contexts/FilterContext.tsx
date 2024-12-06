import { createContext, ReactNode, useState } from "react";

interface FilterContext {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  getQueryString: () => string;
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
  const getQueryString = () => {
    return `?placeId=0
&avaible=${filters.avaible}
&manufacturerId=${filters.manufacturer}
&wheelSize=${filters.wheelSize}
&frameSize=${filters.size}
&name=${filters.name.trim().toLowerCase()}
&electric=${filters.isElectric}
&statusId=${filters.status}
&isWoman=${filters.isWoman}
&isKids=${filters.isKids}
&minPrice=${filters.minPrice}
&maxPrice=${filters.maxPrice}
&colorId=${filters.color}
&categoryId=${filters.category}`.replaceAll("\n", "");
  };

  const updateFilters = (key: keyof Filters, value: Filters[keyof Filters]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  return <FilterContext.Provider value={{ filters, updateFilters, getQueryString }}>{children}</FilterContext.Provider>;
}
