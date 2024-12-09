import { useRef, useState } from "react";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/useFilter";
import { ThemedView } from "../ThemedView";
import { ThemedTextInput } from "../ThemedTextInput";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface NumberFilterProps {
  title: string;
  minValue: Number;
  maxValue: Number;
  minKey: keyof Filters;
  maxKey: keyof Filters;
}

export default function RangeFilter({ title, minValue, maxValue, minKey, maxKey }: NumberFilterProps) {
  const [minVal, setMinVal] = useState<Number | "">(minValue);
  const [maxVal, setMaxVal] = useState<Number | "">(maxValue);
  const { updateFilters } = useFilter();
  const ParseText = (text: string) => {
    if (text === "") return "";
    else return Number(text.replace(/[^0-9]/g, ""));
  };
  const handleEndEditing = (key: keyof Filters, val: Number | "", defaultVal: Number) => {
    if (val === "") {
      updateFilters(key, defaultVal);
    } else {
      updateFilters(key, val);
    }
  };
  return (
    <View>
      <ThemedView style={styles.wrapper}>
        <ThemedText>Minimum:</ThemedText>
        <ThemedTextInput
          style={{ height: 48, marginLeft: 10, flexGrow: 2 }}
          keyboardType='number-pad'
          value={minVal.toString()}
          onChangeText={(text) => setMinVal(ParseText(text))}
          onEndEditing={() => {
            handleEndEditing(minKey, minVal, minValue);
          }}
          key={"MinInput"}
        />
      </ThemedView>
      <ThemedView style={styles.wrapper}>
        <ThemedText>Maksimum:</ThemedText>
        <ThemedTextInput
          style={{ height: 48, marginLeft: 10, flexGrow: 2 }}
          keyboardType='number-pad'
          value={maxVal.toString()}
          onChangeText={(text) => setMaxVal(ParseText(text))}
          onEndEditing={() => {
            handleEndEditing(maxKey, maxVal, maxValue);
          }}
          key={"MaxInput"}
        />
      </ThemedView>
    </View>
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
