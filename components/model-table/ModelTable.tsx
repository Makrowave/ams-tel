import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import { useFilter } from "@/hooks/contexts/useFilter";
import { ThemedView } from "../themed/ThemedView";
import ModelRecord from "./ModelRecord";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { View, ViewProps } from "react-native";
import { ModelTableBindProps } from "../ModelSearchPage";

export default function ModelTable({ style, bindMode }: ViewProps & ModelTableBindProps) {
  const { getQueryString } = useFilter();
  const { modelData, modelIsError, modelIsPending } = useModelsData(getQueryString());

  return (
    <ThemedView style={style}>
      {!(modelIsPending || modelIsError) && (
        <FlatList
          data={modelData}
          renderItem={({ item }) => <ModelRecord model={item} bindMode={bindMode} />}
          keyExtractor={(model) => model.modelId.toString()}
        />
      )}
    </ThemedView>
  );
}
