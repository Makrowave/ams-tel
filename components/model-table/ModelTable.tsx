import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { useFilter } from "@/hooks/useFilter";
import { ThemedView } from "../ThemedView";
import ModelRecord from "./ModelRecord";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { View, ViewProps } from "react-native";

export default function ModelTable({ style }: ViewProps) {
  const { getQueryString } = useFilter();
  const { modelData, modelIsError, modelIsPending } = useModelsData(getQueryString());

  return (
    <ThemedView style={style}>
      {!(modelIsPending || modelIsError) && (
        <FlatList
          data={modelData}
          renderItem={({ item }) => <ModelRecord model={item} />}
          keyExtractor={(model) => model.modelId.toString()}
        />
      )}
    </ThemedView>
  );
}
