import Listing from "@/components/Listing";
import PlaceAmountTable from "@/components/PlaceAmountTable";
import { ModelRecordData } from "@/constants/Types";
import { useCategoriesData } from "@/hooks/queryHooks/useCategories";
import { usePlacesData } from "@/hooks/queryHooks/usePlacesData";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function ModelPage() {
  const { modelString } = useLocalSearchParams<{ modelString: string }>();
  const model = JSON.parse(modelString) as ModelRecordData;
  // const { placeFindByKey } = usePlacesData();
  const { categoryFindByKey } = useCategoriesData();
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Listing title='Model' text={model.modelName} />
        <Listing title='Kod EAN' text={model.eanCode ?? ""} />
        <Listing title='Kod producenta' text={model.productCode ?? ""} />
        <Listing title='Typ ramy' text={model.isWoman ? "Damski" : "Męski"} />
        <Listing title='Rozmiar' text={model.frameSize + "x" + model.wheelSize} />
        <Listing title='Kategoria' text={categoryFindByKey(model.categoryId)} />
        <PlaceAmountTable id={model.modelId} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 20,
  },
});
