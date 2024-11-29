import { Filters, NumberKeys } from "../contexts/FilterContext";
import SelectFilter from "./SelectFilter";

interface FetchSelectFilterProps {
  queryKey: string;
  updateKey: NumberKeys;
  colored?: boolean;
}

export default function FetchSelectFilter({ queryKey, updateKey, colored = false }: FetchSelectFilterProps) {
  const data = [
    { key: 1, value: "Gaming", color: "#ff0000" },
    { key: 2, value: "Gaming2", color: "#00ff00" },
    { key: 3, value: "Gaming3", color: "#0000ff" },
  ];
  return <SelectFilter data={data} colored={colored} updateKey={updateKey} />;
}
