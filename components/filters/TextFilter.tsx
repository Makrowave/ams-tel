import { useFilter } from "@/hooks/contexts/useFilter";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "../themed/ThemedView";
import { Filters } from "../contexts/FilterContext";
import { ThemedTextInput } from "../themed/ThemedTextInput";
import { ThemedText } from "../themed/ThemedText";

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
    <ThemedView style={styles.wrapper}>
      <ThemedText>Nazwa:</ThemedText>
      <ThemedTextInput
        style={{ height: 48, marginLeft: 10, flexGrow: 2 }}
        value={value.toString()}
        autoFocus
        onChangeText={(text) => setValue(text)}
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
