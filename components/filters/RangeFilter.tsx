import { useState } from "react";
import { Filters } from "../contexts/FilterContext";
import { useFilter } from "@/hooks/useFilter";
import { ThemedView } from "../ThemedView";
import { TextInput } from "react-native-gesture-handler";

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
    <ThemedView>
      <TextInput
        keyboardType='number-pad'
        style={{ backgroundColor: "#ffffff", height: 40 }}
        value={minVal.toString()}
        onChangeText={(text) => setMinVal(ParseText(text))}
        onEndEditing={() => {
          handleEndEditing(minKey, minVal, minValue);
        }}
      />
      <TextInput
        keyboardType='number-pad'
        style={{ backgroundColor: "#ffffff", height: 40 }}
        value={maxVal.toString()}
        onChangeText={(text) => setMaxVal(ParseText(text))}
        onEndEditing={() => {
          handleEndEditing(maxKey, maxVal, maxValue);
        }}
      />
    </ThemedView>
  );
}
