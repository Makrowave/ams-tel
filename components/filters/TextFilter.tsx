import { useFilter } from "@/hooks/useFilter";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";
import { ThemedView } from "../ThemedView";
import { Filters } from "../contexts/FilterContext";

interface TextFilterProps {
  title: string;
  defaultValue: string;
  updateKey: keyof Filters;
}

export default function TextFilter({ defaultValue, updateKey }: TextFilterProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const { updateFilters } = useFilter();
  const navigation = useNavigation();

  return (
    <ThemedView>
      <TextInput
        style={{ backgroundColor: "#ffffff", height: 40 }}
        value={value.toString()}
        onChangeText={(text) => setValue(text)}
        onEndEditing={() => {
          updateFilters(updateKey, value);
          navigation.goBack();
        }}
      />
    </ThemedView>
  );
}
