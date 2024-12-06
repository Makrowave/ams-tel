import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ModelRecordData } from "@/constants/Types";
import { useLocalSearchParams } from "expo-router";

export default function ModelPage() {
  const { modelString } = useLocalSearchParams<{ modelString: string }>();
  const model = JSON.parse(modelString) as ModelRecordData;
  return (
    <ThemedView>
      <ThemedText>{model.modelId.toString()}</ThemedText>
      <ThemedText>Model</ThemedText>
      <ThemedText>{model.modelName}</ThemedText>
      <ThemedText>Kod EAN</ThemedText>
      <ThemedText>{model.eanCode}</ThemedText>
      <ThemedText>Kod producenta</ThemedText>
      <ThemedText>{model.productCode}</ThemedText>
    </ThemedView>
  );
}
