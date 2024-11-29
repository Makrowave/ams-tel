import { useFilter } from "@/hooks/useFilter";
import SelectableForwardedButton, { Option } from "../RadioGroup";
import { Filters, NumberKeys } from "../contexts/FilterContext";

interface SelectFilterProps {
  data: Array<Option>;
  colored: boolean;
  updateKey: NumberKeys;
}

export default function SelectFilter({ updateKey, data, colored }: SelectFilterProps) {
  const { updateFilters, filters } = useFilter();
  const handleChange = (value: Number) => {
    updateFilters(updateKey, value);
  };

  return (
    <SelectableForwardedButton data={data} onSelect={handleChange} selection={filters[updateKey]} colored={colored} />
  );
}
