import { useFilter } from "@/hooks/contexts/useFilter";
import SelectableForwardedButton, { Option } from "../RadioGroup";
import { Filters, NumberKeys } from "../contexts/FilterContext";
import { ScrollView } from "react-native";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <SelectableForwardedButton
        data={data}
        onSelect={handleChange}
        selection={filters[updateKey]}
        colored={colored}
        size='small'
      />
    </ScrollView>
  );
}
