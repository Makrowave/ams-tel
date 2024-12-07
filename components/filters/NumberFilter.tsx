import { ThemedView } from "../ThemedView";
import { ForwardedButton } from "../LabeledButton";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

interface NumberFilterProps {
  title: string;
  defaultValue: Number | "";
  updateKey: keyof Filters;
}
export default function NumberFilter({ title, defaultValue, updateKey }: NumberFilterProps) {
  const [value, setValue] = useState<Number | "">(defaultValue);
  const { updateFilters } = useFilter();
  const navigation = useNavigation();
  const ParseText = (text: string) => {
    if (text === "") return "";
    else return Number(text.replace(/[^0-9]/g, ""));
  };

  return (
    <ThemedView>
      <TextInput
        keyboardType='number-pad'
        style={{ backgroundColor: "#ffffff", height: 40 }}
        value={value.toString()}
        onChangeText={(text) => setValue(ParseText(text))}
        onEndEditing={() => {
          updateFilters(updateKey, value);
          navigation.goBack();
        }}
      />
    </ThemedView>
  );
}
