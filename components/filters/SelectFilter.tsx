import { useFilter } from "@/hooks/contexts/useFilter";
import SelectableForwardedButton, { Option } from "../RadioGroup";
import { ColorFilter, NumberKeys, StringFilter } from "../contexts/FilterContext";
import { ScrollView } from "react-native";

interface SelectFilterProps {
  data: Array<Option>;
  colored: boolean;
  updateKey: NumberKeys;
}

export default function SelectFilter({ updateKey, data, colored }: SelectFilterProps) {
  const { updateFilters, filters } = useFilter();
  const handleChange = (value: Number) => {
    const record = data.find((option) => option.key === value)!;
    let result;
    if (colored) {
      result = { id: record.key, name: record.value, color: record.color! };
    } else {
      result = { id: record.key, name: record.value };
    }
    updateFilters(updateKey, result);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SelectableForwardedButton
        data={data}
        onSelect={handleChange}
        selection={(filters[updateKey] as StringFilter | ColorFilter).id}
        colored={colored}
        size='small'
      />
    </ScrollView>
  );
}
