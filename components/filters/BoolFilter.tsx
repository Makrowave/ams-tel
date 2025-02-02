import { ThemedView } from "../themed/ThemedView";
import { ForwardedButton } from "../LabeledButton";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/contexts/useFilter";

interface BoolFilterProps {
  title: string;
  value: boolean;
  updateKey: keyof Filters;
}
export default function BoolFilter({ title, value, updateKey }: BoolFilterProps) {
  const { updateFilters } = useFilter();
  return (
    <ThemedView>
      <ForwardedButton
        type='single'
        onPress={() => updateFilters(updateKey, !value)}
        title={title}
        content={value ? "On" : "Off"}
        hasContent={true}
      />
    </ThemedView>
  );
}
