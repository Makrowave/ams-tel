import { ThemedView } from "../themed/ThemedView";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/contexts/useFilter";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { ThemedTextInput } from "../themed/ThemedTextInput";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed/ThemedText";

interface NumberFilterProps {
  title: string;
  defaultValue: Number | "";
  updateKey: keyof Filters;
}
export default function NumberFilter({defaultValue, updateKey }: NumberFilterProps) {
  const [value, setValue] = useState<Number | "">(defaultValue);
  const { updateFilters } = useFilter();
  const navigation = useNavigation();
  const ParseText = (text: string) => {
    if (text === "") return "";
    else return Number(text.replace(/[^0-9]/g, ""));
  };

  return (
    <ThemedView style={styles.wrapper}>
      <ThemedText>Rama:</ThemedText>
      <ThemedTextInput
        keyboardType='number-pad'
        autoFocus
        style={{ height: 48, marginLeft: 10, flexGrow: 2 }}
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

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
