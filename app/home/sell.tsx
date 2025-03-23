import showKeyboardAlert from "@/components/alert/KeyboardAlert";
import Scanner from "@/components/Scanner";
import {ThemedGestureHandlerRootView} from "@/components/themed/ThemedGestureHandlerRootView";
import {ModelsQuery, QuerySrc} from "@/constants/QuerySrc";
import {ModelRecordData} from "@/constants/Types";
import {Statuses} from "@/constants/UtilEnums";
import {useActionData} from "@/hooks/contexts/useActionData";
import {useActionResult} from "@/hooks/contexts/useActionResult";
import {useRefreshModel} from "@/hooks/contexts/useRefreshModel";
import {useBikes} from "@/hooks/queryHooks/useBikes";
import {useModelsData} from "@/hooks/queryHooks/useModelsData";
import {usePlacesData} from "@/hooks/queryHooks/usePlacesData";
import {useStatusesData} from "@/hooks/queryHooks/useStatusesData";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {AxiosError} from "axios";
import {Link, Stack, useRouter} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {Button, View, StyleSheet, Alert, Vibration, TouchableOpacity, ScrollView} from "react-native";
import ActionHeader from "@/components/navigation/ActionsHeader";
import {ThemedView} from "@/components/themed/ThemedView";
import {ThemedText} from "@/components/themed/ThemedText";
import {ContentHolderButton, ContentNavButton} from "@/components/buttons/ContentHolderButton";

export default function Sell() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [code, setCode] = useState("");
  const [price, setPrice] = useState<string>("");
  const [model, setModel] = useState<ModelRecordData | undefined>(undefined);
  const {setContextCode, userLocationKey, statusKey, initializeValues} = useActionData();
  const {placeData, placeIsPending, placeIsError, placeFindByKey} = usePlacesData();
  const {statusData, statusIsPending, statusIsError, statusFindNameByKey: statusFindByKey} = useStatusesData();
  const {modelFindByEan, modelRefetch} = useModelsData(ModelsQuery.all);
  const {selectFirstMatch, bikeRefetch} = useBikes(model?.modelId ?? 0);
  const updateable = useRef<boolean>(true);
  const {setFailure, setSuccess} = useActionResult();
  const [isCodeBound, setIsCodeBound] = useState<boolean | undefined>();

  useEffect(() => {
    initializeValues(Statuses.assembled, undefined, undefined);
  }, []);

  //Blocks next scan for some time and sets values
  const handleScan = async (data: string) => {
    if (updateable.current) {
      updateable.current = false;
      setTimeout(() => {
        updateable.current = true;
      }, 800);
      await changeCodeAndModel(data);
      Vibration.vibrate();
    }
  };

  const changeCodeAndModel = async (data: string) => {
    await modelRefetch();
    setCode(data);
    const foundModel = modelFindByEan(data);
    if (foundModel === undefined) {
      setIsCodeBound(false);
    } else {
      setIsCodeBound(true);
    }
    setModel(foundModel);
    setPrice(foundModel?.price.toString() ?? "");
  };

  const {refreshModel, setRefreshModel} = useRefreshModel();

  const refreshOnBind = () => {
    if (refreshModel) {
      const foundModel = modelFindByEan(code);
      if (foundModel === undefined) setIsCodeBound(false);
      else setIsCodeBound(true);
      setModel(foundModel);
      setRefreshModel(false);
    }
  };
  useEffect(() => {
    refreshOnBind();
  }, [refreshModel]);

  const handleSell = async () => {
    if (code === "") {
      setFailure("Nie zeskanowano roweru");
      return;
    }
    if (userLocationKey === undefined || statusKey === undefined) {
      setFailure("Nie wybrano statusu lub miejsca");
      return;
    }
    await bikeRefetch();
    const bikeId = selectFirstMatch(userLocationKey, statusKey);
    if (bikeId === undefined) {
      setFailure("Nie znaleziono roweru");
      return;
    }
    try {
      const result = await axiosPrivate.put(
        `${QuerySrc.Bikes}/${bikeId}`,
        JSON.stringify({
          statusId: Statuses.sold,
          salePrice: price,
        })
      );
      if (result.status === 200) {
        setSuccess("Sprzedano rower");
        router.back();
      }
    } catch (err) {
      const error = err as AxiosError;
      setFailure(error.message);
    }
  };

  return (
    <ThemedGestureHandlerRootView>
      <ActionHeader title="Sprzedaj rower" code={code} isCodeBound={isCodeBound}/>
      <Scanner onBarcodeScanned={handleScan}/>
      <View style={styles.wrapper}>
        <ThemedView style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
          <ScrollView>
            <ContentHolderButton
              icon='bicycle'
              title='Rower'
              content={model?.modelName ?? ""}
              placeholder={"Tu pojawi się rower"}
              disabled
            />
            <ContentHolderButton
              icon='barcode'
              style={styles.button}
              title='Kod'
              content={code}
              onPress={() => showKeyboardAlert("Kod", changeCodeAndModel)}
              placeholder={"Kod"}
              hasChevron
            />
            <ContentNavButton
              href={{
                pathname: "/home/select-screen",
                params: {datastring: JSON.stringify(placeData), selection: "userLocation"},
              }}
              icon='shop'
              style={styles.button}
              title='Miejsce'
              content={placeFindByKey(userLocationKey)}
              hasChevron
            />
            <ContentNavButton
              href={{
                pathname: "/home/select-screen",
                params: {datastring: JSON.stringify(statusData), selection: "status"},
              }}
              icon='circle-info'
              style={styles.button}
              title='Status'
              content={statusFindByKey(statusKey)}
              hasChevron
            />
            <ContentHolderButton
              icon='money-bill'
              style={styles.button}
              title='Cena'
              content={price}
              onPress={() => showKeyboardAlert("Cena", setPrice, "numeric")}
              placeholder={"Cena"}
              hasChevron
            />
            <TouchableOpacity onPress={() => handleSell()}>
              <ThemedView style={[styles.button, styles.confirmButton]}>
                <ThemedText style={{fontSize: 18}}>
                  Sprzedaj
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </View>
    </ThemedGestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
  },
  button: {
    borderTopWidth: 1,
  },
  confirmButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "transparent",
  }
});
