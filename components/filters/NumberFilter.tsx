import { ThemedView } from "../ThemedView";
import { ForwardedButton } from "../LabeledButton";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/useFilter";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { ThemedTextInput } from "../ThemedTextInput";
import { StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

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
