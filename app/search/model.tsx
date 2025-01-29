import { ForwardedButton } from "@/components/LabeledButton";
import Listing from "@/components/Listing";
import PlaceAmountTable from "@/components/PlaceAmountTable";
import { ModelsQuery, QuerySrc } from "@/constants/QuerySrc";
import { ModelRecordData } from "@/constants/Types";
import { useActionData } from "@/hooks/contexts/useActionData";
import { useRefreshModel } from "@/hooks/contexts/useRefreshModel";
import { useCategoriesData } from "@/hooks/queryHooks/useCategories";
import { useModelsData } from "@/hooks/queryHooks/useModelsData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function ModelPage() {
  const { modelString, bindMode } = useLocalSearchParams<{
    modelString: string;
    bindMode: string;
  }>();
  const model = JSON.parse(modelString) as ModelRecordData;
  const { setRefreshModel } = useRefreshModel();
  const { modelRefetch } = useModelsData(ModelsQuery.all);
  const { contextCode } = useActionData();
  const axiosPrivate = useAxiosPrivate();
  const bindModel = async () => {
    await axiosPrivate.put(
      `${QuerySrc.Models}/${model.modelId}`,
      {
        eanCode: contextCode,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  };
  const { categoryFindByKey } = useCategoriesData();
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bindMode === "true" && (
          <ForwardedButton
            title='Przypisz EAN'
            size='small'
            type='single'
            style={{ marginBottom: 20 }}
            onPress={async () => {
              await bindModel();
              await modelRefetch();
              setRefreshModel(true);
              router.back();
              router.back();
            }}
          />
        )}
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
